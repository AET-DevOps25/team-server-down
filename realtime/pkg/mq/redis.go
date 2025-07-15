package mq

import (
	"context"
	"github.com/AET-DevOps25/team-server-down/pkg/config"
	"github.com/redis/go-redis/v9"
)

type RedisMQ struct {
	client *redis.Client
}
type RedisMessageHandler func(channel, payload string)

func NewRedisMQ(cfg config.Config) *RedisMQ {
	return &RedisMQ{
		client: redis.NewClient(&redis.Options{
			Addr: cfg.REDIS_HOST + ":" + cfg.REDIS_PORT,
		}),
	}
}

func (mq *RedisMQ) Subscribe(channel string, handler RedisMessageHandler) error {
	ctx := context.Background()
	pubsub := mq.client.Subscribe(ctx, channel)
	ch := pubsub.Channel()

	go func() {
		for msg := range ch {
			handler(msg.Channel, msg.Payload)
		}
	}()

	return nil
}

func (mq *RedisMQ) Publish(channel, payload string) error {
	return mq.client.Publish(context.Background(), channel, payload).Err()
}
