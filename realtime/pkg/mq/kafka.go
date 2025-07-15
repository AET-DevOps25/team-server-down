package mq

import (
	"github.com/AET-DevOps25/team-server-down/pkg/config"
	"github.com/segmentio/kafka-go"
	"time"
)

func NewReaderProvider(cfg config.Config) func(groupId string) *kafka.Reader {
	return func(groupId string) *kafka.Reader {
		return kafka.NewReader(kafka.ReaderConfig{
			Brokers:     []string{cfg.KAFKA_HOST + ":" + cfg.KAFKA_PORT},
			Topic:       cfg.KAFKA_TOPIC,
			GroupID:     groupId,
			StartOffset: kafka.LastOffset,
			MinBytes:    1,
			MaxBytes:    10e6,
			MaxWait:     10 * time.Millisecond,
		})
	}
}

func NewWriterProvider(cfg config.Config) func() *kafka.Writer {
	writer := &kafka.Writer{
		Addr:                   kafka.TCP(cfg.KAFKA_HOST + ":" + cfg.KAFKA_PORT),
		Topic:                  cfg.KAFKA_TOPIC,
		Balancer:               &kafka.Hash{},
		AllowAutoTopicCreation: true,
	}

	return func() *kafka.Writer {
		return writer
	}
}
