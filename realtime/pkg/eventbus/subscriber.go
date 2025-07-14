package eventbus

import (
	"context"
	"github.com/segmentio/kafka-go"
)

type Subscriber struct {
	reader *kafka.Reader
}

func NewSubscriber(r *kafka.Reader) *Subscriber {
	return &Subscriber{
		reader: r,
	}
}

func (s *Subscriber) Subscribe(ctx context.Context, handler func(key, value string)) error {
	for {
		msg, err := s.reader.ReadMessage(ctx)
		if err != nil {
			return err
		}
		handler(string(msg.Key), string(msg.Value))
	}
}
