# Whiteboard Monitoring Setup Guide

## 📊 Overview

This guide covers the monitoring setup for the Whiteboard application, including Grafana, Prometheus, and Alertmanager.

### 🎯 Quick Access Points

- **Grafana**: `http://localhost:3001` 
- **Prometheus**: `http://localhost:9090`
- **Alertmanager**: `http://localhost:9093`

## 📈 Dashboard Management

### Current Dashboards
This setup includes three pre-configured dashboards that provide insights into request rates, response times, and error rates:
- **Genai Dashboard**
- **Realtime Dashboard**
- **Server Dashboard**



### Dashboard Provisioning
Grafana automatically loads dashboards from the `/whiteboard-observability/files/grafana/dashboards/` directory on startup.

## 🔧 Configuration Files

- **`prometheus.yml`**: 
  - Purpose: Defines metrics scraping configuration
  - Key settings: Scrape intervals, target endpoints

- **`alertmanager.yml`**:
  - Purpose: Alert routing and notification config
  - Features: alert notifications

## 🚨 Alert Rules

Currently configured alerts:
- Service Down (instance offline >1m)

### Alert Notifications
- channel: Mailhog
