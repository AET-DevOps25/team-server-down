package eventbus

import (
	"context"
	"github.com/segmentio/kafka-go"
)

type Publisher struct {
	writer *kafka.Writer
}

func NewPublisher(writerProvider func() *kafka.Writer) *Publisher {
	return &Publisher{
		writer: writerProvider(),
	}
}

func (p *Publisher) Publish(key, value string) error {
	msg := kafka.Message{
		Key:   []byte(key),
		Value: []byte(value),
	}
	return p.writer.WriteMessages(context.Background(), msg)
}
