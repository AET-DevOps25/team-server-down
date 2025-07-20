# 🚦 Spring Boot Server

This is the Spring Boot backend powering the Whiteboard. It provides REST APIs, integrates with a postgresql database using Hibernate, and supports migrations, metrics, and automated checks for quality and consistency.

---

## 🚀 Local Development

### Prerequisites

1. **Install & run Docker Desktop**


### ▶️ Starting the Server

```bash
docker compose build server
docker compose up -d server
```

---

### 📚 API Documentation & Metrics

- **Swagger UI:**  
  [http://localhost:9091/swagger-ui/index.html](http://localhost:9091/swagger-ui/index.html)

- **OpenAPI JSON:**  
  [http://localhost:9091/v3/api-docs](http://localhost:9091/v3/api-docs)

- **Prometheus Metrics:**  
  [http://localhost:9091/actuator/prometheus](http://localhost:9091/actuator/prometheus)

---

## ⚙️ Development Tasks

| **Action**         | **Command**                |
|--------------------|---------------------------|
| Run DB migrations  | `gradle flywayMigrate`    |
| Check formatting   | `gradle spotlessCheck`    |
| Format code        | `gradle spotlessApply`    |
| Run tests          | `gradle test`             |

---

## 🛠️ Tech Overview

- **Spring Boot** for REST API & application logic
- **Hibernate** for ORM & database access
- **Flyway** for database migrations
- **Spotless** for formatting
- **Gradle** for build automation
- **Prometheus** endpoint for metrics
