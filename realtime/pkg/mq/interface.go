package mq

type MQ interface {
	Subscribe(channel string, handler RedisMessageHandler) error
	Publish(channel, payload string) error
}
