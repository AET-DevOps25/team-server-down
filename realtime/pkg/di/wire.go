//go:build wireinject
// +build wireinject

package di

import (
	"github.com/AET-DevOps25/team-server-down/pkg/api/handler"
	"github.com/AET-DevOps25/team-server-down/pkg/config"
	"github.com/AET-DevOps25/team-server-down/pkg/mq"
	"github.com/google/wire"
)

import http "github.com/AET-DevOps25/team-server-down/pkg/api"

func InitializeAPI(cfg config.Config) (*http.Server, error) {
	wire.Build(
		http.NewServer,
		handler.NewRootHandler,
		handler.NewWhiteboardHandler,
		mq.NewRedisMQ,
	)

	return &http.Server{}, nil
}
