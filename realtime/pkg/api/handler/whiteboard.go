package handler

import (
	"context"
	"github.com/AET-DevOps25/team-server-down/pkg/api/metrics"
	"github.com/AET-DevOps25/team-server-down/pkg/mq"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"time"
)

type WhiteboardHandler struct {
	mq      *mq.RedisMQ
	metrics *metrics.Metrics
}

func NewWhiteboardHandler(redisMQ *mq.RedisMQ, metrics *metrics.Metrics) *WhiteboardHandler {
	return &WhiteboardHandler{
		redisMQ,
		metrics,
	}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (wh *WhiteboardHandler) GetWhiteboardEvents(c *gin.Context) {
	whiteboardId := c.Param("whiteboardId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		wh.metrics.WebsocketUpgradeErrors.Inc()
		return
	}
	defer conn.Close()

	wh.metrics.WebsocketConnectionsActive.Inc()
	defer wh.metrics.WebsocketConnectionsActive.Dec()

	start := time.Now()
	defer func() {
		duration := time.Since(start).Seconds()
		wh.metrics.WebsocketConnectionDuration.Observe(duration)
	}()

	ctx, cancel := context.WithCancel(c.Request.Context())
	defer cancel()

	// Close the connection when client disconnects
	go func() {
		for {
			if _, _, err := conn.NextReader(); err != nil {
				cancel()
				return
			}
		}
	}()

	msgCh := make(chan []byte, 100)

	// Subscribe to whiteboard events
	go func() {
		err := wh.mq.Subscribe(whiteboardId, func(key, value string) {
			if key != whiteboardId {
				return
			}
			select {
			case msgCh <- []byte(value):
			case <-ctx.Done():
				return
			}
		})
		if err != nil && ctx.Err() == nil {
			cancel()
		}
	}()

	// Stream messages to the WebSocket client
	for {
		select {
		case <-ctx.Done():
			return
		case msg, ok := <-msgCh:
			if !ok {
				return
			}
			if err := conn.WriteMessage(websocket.TextMessage, msg); err != nil {
				wh.metrics.WebsocketWriteErrors.Inc()
				cancel()
				return
			}
			wh.metrics.WebsocketSentMessages.Inc()
		}
	}
}

func (wh *WhiteboardHandler) PublishWhiteboardEvents(c *gin.Context) {
	whiteboardId := c.Param("whiteboardId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		wh.metrics.WebsocketUpgradeErrors.Inc()
		return
	}
	defer conn.Close()

	wh.metrics.WebsocketConnectionsActive.Inc()
	defer wh.metrics.WebsocketConnectionsActive.Dec()

	start := time.Now()
	defer func() {
		duration := time.Since(start).Seconds()
		wh.metrics.WebsocketConnectionDuration.Observe(duration)
	}()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			wh.metrics.WebsocketReadErrors.Inc()
			break
		}
		wh.metrics.WebsocketReceivedMessages.Inc()

		err = wh.mq.Publish(whiteboardId, string(message))
		if err != nil {
			log.Printf("Failed to publish message: %v", err)
		}
	}
}
