package handler

import (
	"fmt"
	"github.com/AET-DevOps25/team-server-down/pkg/eventbus"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"strconv"
	"time"
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
	defer conn.Close()

	i := 0
	for {
		i++
		conn.WriteMessage(websocket.TextMessage, []byte("New msg for whiteboard "+whiteboardId+" (#"+strconv.Itoa(i)+")"))
		time.Sleep(time.Second)
	}
}

func (wh *WhiteboardHandler) PublishWhiteboardEvents(c *gin.Context) {
	whiteboardId := c.Param("id")

	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	for {
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			break
		}
		fmt.Printf("messageType: %d, whiteboard: %s, message: %s\n", messageType, whiteboardId, message)
	}
}
