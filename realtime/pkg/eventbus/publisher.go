package eventbus

import "github.com/segmentio/kafka-go"

type Publisher struct {
	writer *kafka.Writer
}

func NewPublisher(w *kafka.Writer) *Publisher {
	return &Publisher{
		writer: w,
	}
}

func (p *Publisher) Publish() {

}
