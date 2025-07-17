package mq

type MockMQ struct{}

func NewMockMQ() MQ {
	return &MockMQ{}
}

func (m *MockMQ) Subscribe(channel string, handler RedisMessageHandler) error {
	return nil
}

func (m *MockMQ) Publish(channel, payload string) error {
	return nil
}
