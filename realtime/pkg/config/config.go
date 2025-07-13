package config

import (
	"github.com/go-playground/validator/v10"
	"github.com/spf13/viper"
)

type Config struct {
	KAFKA_HOST  string `mapstructure:"KAFKA_HOST"`
	KAFKA_PORT  string `mapstructure:"KAFKA_PORT"`
	KAFKA_TOPIC string `mapstructure:"KAFKA_TOPIC"`
}

var envs = []string{
	"KAFKA_HOST", "KAFKA_PORT", "KAFKA_TOPIC",
}

func LoadConfig() (Config, error) {
	var config Config

	viper.AddConfigPath("./")
	viper.SetConfigFile(".env")
	viper.ReadInConfig()

	for _, env := range envs {
		if err := viper.BindEnv(env); err != nil {
			return config, err
		}
	}

	if err := viper.Unmarshal(&config); err != nil {
		return config, err
	}

	if err := validator.New().Struct(&config); err != nil {
		return config, err
	}

	return config, nil
}
