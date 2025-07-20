package metrics

import "github.com/prometheus/client_golang/prometheus"

func ProvideRegistry() *prometheus.Registry {
	return prometheus.NewRegistry()
}

func ProvideMetrics(reg *prometheus.Registry) *Metrics {
	return NewMetrics(reg)
}
