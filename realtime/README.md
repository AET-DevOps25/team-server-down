## Realtime Service

--- 
## Local Development

### Prerequisites
1. **Install & run Docker Desktop**

### Starting the server
```bash
docker compose build realtime
docker compose up -d realtime
```
---
### Endpoints & Docs
- API Docs (Swagger UI): `/swagger/index.html`
- OpenAPI JSON: `swagger/doc.json`
- Prometheus Metrics: `/swagger/doc.json`
- Heath: `/`

---
### Development Info
- Framework: Go Gin

#### Available Commands
```
➔ make help
build                          Compile the code, build Executable File
run                            Start application
test                           Run tests
test-coverage                  Run tests and generate coverage file
deps                           Install dependencies
deps-cleancache                Clear cache in Go module
wire                           Generate wire_gen.go
swag                           Generate swagger docs
help                           Display this help screen
```