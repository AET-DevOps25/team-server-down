package mq

import (
	"github.com/AET-DevOps25/team-server-down/pkg/config"
	"github.com/segmentio/kafka-go"
)

func NewReader(cfg config.Config) *kafka.Reader {
	reader := kafka.NewReader(kafka.ReaderConfig{
		Brokers:     []string{cfg.KAFKA_HOST + ":" + cfg.KAFKA_PORT},
		Topic:       cfg.KAFKA_TOPIC,
		StartOffset: kafka.LastOffset,
		MinBytes:    1,
		MaxBytes:    10e6,
	})

	return reader
}

func NewWriter(cfg config.Config) *kafka.Writer {
	writer := kafka.Writer{
		Addr:                   kafka.TCP(cfg.KAFKA_HOST + ":" + cfg.KAFKA_PORT),
		Topic:                  cfg.KAFKA_TOPIC,
		Balancer:               &kafka.Hash{},
		AllowAutoTopicCreation: true,
	}

	return &writer
}
