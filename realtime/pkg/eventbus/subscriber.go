package eventbus

import (
	"context"
	"github.com/segmentio/kafka-go"
)

type Subscriber struct {
	readerProvider func(groupId string) *kafka.Reader
}

func NewSubscriber(readerProvider func(groupId string) *kafka.Reader) *Subscriber {
	return &Subscriber{
		readerProvider: readerProvider,
	}
}

func (s *Subscriber) Subscribe(ctx context.Context, groupId string, handler func(key, value string)) error {
	reader := s.readerProvider(groupId)
	defer reader.Close()
	for {
		msg, err := reader.ReadMessage(ctx)
		if err != nil {
			return err
		}
		go handler(string(msg.Key), string(msg.Value))
	}
}
