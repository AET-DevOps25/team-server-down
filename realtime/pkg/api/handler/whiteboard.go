package handler

import (
	"github.com/AET-DevOps25/team-server-down/pkg/eventbus"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
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
	whiteboardId := c.Param("id")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}

	_ = wh.subscriber.Subscribe(c, func(key, value string) {
		if key == whiteboardId {
			err := conn.WriteMessage(websocket.TextMessage, []byte(value))
			if err != nil {
			}
		}
	})
}

func (wh *WhiteboardHandler) PublishWhiteboardEvents(c *gin.Context) {
	whiteboardId := c.Param("id")

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
