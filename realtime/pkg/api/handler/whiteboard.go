package handler

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/gorilla/websocket"
	"net/http"
	"strconv"
	"time"
)

type WhiteboardHandler struct{}

func NewWhiteboardHandler() *WhiteboardHandler {
	return &WhiteboardHandler{}
}

var upgrader = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func (wh *WhiteboardHandler) GetWhiteboardEvents(c *gin.Context) {
	conn, err := upgrader.Upgrade(c.Writer, c.Request, nil)
	if err != nil {
		return
	}
	defer conn.Close()

	i := 0
	for {
		i++
		conn.WriteMessage(websocket.TextMessage, []byte("New message (#"+strconv.Itoa(i)+")"))
		time.Sleep(time.Second)
	}
}

func (wh *WhiteboardHandler) PublishWhiteboardEvents(c *gin.Context) {
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
		fmt.Printf("messageType: %d, message: %s\n", messageType, message)
	}
}
