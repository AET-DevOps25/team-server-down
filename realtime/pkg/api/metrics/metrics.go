package metrics

import "github.com/prometheus/client_golang/prometheus"

type Metrics struct {
	WebsocketConnectionsActive  prometheus.Gauge
	WebsocketConnectionDuration prometheus.Histogram
	WebsocketUpgradeErrors      prometheus.Counter
	WebsocketReadErrors         prometheus.Counter
	WebsocketWriteErrors        prometheus.Counter
	WebsocketSentMessages       prometheus.Counter
	WebsocketReceivedMessages   prometheus.Counter
}

func NewMetrics(reg *prometheus.Registry) *Metrics {
	m := &Metrics{
		WebsocketConnectionsActive: prometheus.NewGauge(prometheus.GaugeOpts{
			Name: "websocket_connections_active",
			Help: "Number of active websocket connections",
		}),
		WebsocketConnectionDuration: prometheus.NewHistogram(prometheus.HistogramOpts{
			Name: "websocket_connection_duration",
			Help: "Duration of websocket connections",
			Buckets: []float64{
				60,   // 1 min
				120,  // 2 min
				300,  // 5 min
				600,  // 10 min
				900,  // 15 min
				1200, // 20 min
				1800, // 30 min
			},
		}),
		WebsocketUpgradeErrors: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "websocket_upgrade_errors",
			Help: "Number of websocket upgrade errors",
		}),
		WebsocketReadErrors: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "websocket_read_errors",
			Help: "Number of websocket read errors",
		}),
		WebsocketWriteErrors: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "websocket_write_errors",
			Help: "Number of websocket write errors",
		}),
		WebsocketSentMessages: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "websocket_sent_messages",
			Help: "Number of sent websocket messages",
		}),
		WebsocketReceivedMessages: prometheus.NewCounter(prometheus.CounterOpts{
			Name: "websocket_received_messages",
			Help: "Number of received websocket messages",
		}),
	}

	reg.MustRegister(
		m.WebsocketConnectionsActive,
		m.WebsocketConnectionDuration,
		m.WebsocketUpgradeErrors,
		m.WebsocketReadErrors,
		m.WebsocketWriteErrors,
		m.WebsocketSentMessages,
		m.WebsocketReceivedMessages,
	)
	return m
}
