package handler

import (
	"context"
	"github.com/AET-DevOps25/team-server-down/pkg/eventbus"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
)

type WhiteboardHandler struct {
	publisher  *eventbus.Publisher
	subscriber *eventbus.Subscriber
}

func NewWhiteboardHandler(p *eventbus.Publisher, s *eventbus.Subscriber) *WhiteboardHandler {
	return &WhiteboardHandler{
		publisher:  p,
		subscriber: s,
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
	userId := c.Param("userId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		log.Printf("WebSocket upgrade failed: %v", err)
		return
	}
	defer conn.Close()

	groupId := "whiteboard-" + whiteboardId + "-" + userId
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
		defer close(msgCh)
		err := wh.subscriber.Subscribe(ctx, groupId, func(key, value string) {
			if key != whiteboardId {
				return
			}
			select {
			case msgCh <- []byte(value):
			case <-ctx.Done():
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
				cancel()
				return
			}
		}
	}
}

func (wh *WhiteboardHandler) PublishWhiteboardEvents(c *gin.Context) {
	whiteboardId := c.Param("whiteboardId")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	for {
		_, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		err = wh.publisher.Publish(whiteboardId, string(message))
	}
}
