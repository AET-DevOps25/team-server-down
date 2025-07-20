package http

import (
	_ "github.com/AET-DevOps25/team-server-down/cmd/api/docs"
	"github.com/AET-DevOps25/team-server-down/pkg/api/handler"
	"github.com/gin-gonic/gin"
	"github.com/prometheus/client_golang/prometheus"
	"github.com/prometheus/client_golang/prometheus/promhttp"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	engine *gin.Engine
}

func NewServer(
	rootHandler *handler.RootHandler,
	whiteboardHandler *handler.WhiteboardHandler,
	reg *prometheus.Registry,
) *Server {
	engine := gin.New()

	engine.Use(gin.Logger(), gin.Recovery())

	engine.GET("/", rootHandler.GetRoot)
	engine.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	engine.GET("/metrics", gin.WrapH(promhttp.HandlerFor(reg, promhttp.HandlerOpts{})))

	engine.GET("/ws/whiteboard/:whiteboardId/subscribe", whiteboardHandler.GetWhiteboardEvents)
	engine.GET("/ws/whiteboard/:whiteboardId/publish", whiteboardHandler.PublishWhiteboardEvents)
	return &Server{engine: engine}
}

func (s *Server) Start() {
	s.engine.Run(":9090")
}
