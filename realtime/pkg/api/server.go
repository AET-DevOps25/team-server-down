package http

import (
	_ "github.com/AET-DevOps25/team-server-down/cmd/api/docs"
	"github.com/AET-DevOps25/team-server-down/pkg/api/handler"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	engine *gin.Engine
}

func NewServer(rootHandler *handler.RootHandler, whiteboardHandler *handler.WhiteboardHandler) *Server {
	engine := gin.New()

	engine.Use(gin.Logger())

	engine.GET("/", rootHandler.GetRoot)
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	engine.GET("/ws/whiteboard/:id/subscribe", whiteboardHandler.GetWhiteboardEvents)
	engine.GET("/ws/whiteboard/:id/publish", whiteboardHandler.PublishWhiteboardEvents)
	return &Server{engine: engine}
}

func (s *Server) Start() {
	s.engine.Run(":9090")
}
