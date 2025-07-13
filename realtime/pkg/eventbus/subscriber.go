package eventbus

import "github.com/segmentio/kafka-go"

type Subscriber struct {
	reader *kafka.Reader
}

func NewSubscriber(r *kafka.Reader) *Subscriber {
	return &Subscriber{
		reader: r,
	}
}

func (s *Subscriber) Subscribe() {

}
