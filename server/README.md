# Team Server Down Backend
This is the Spring Boot backend for Team Server Down.

## Local development

### Prerequisites
1. Install & run Docker Desktop
1. Add the following entries to `/etc/hosts`:
```
127.0.0.1 api.teamserverdown.devops.aet.cit.tum.de
```

### Enable HTTPS
#### On your development machine
1. Add ./server/docker/nginx/cert.crt to your trust store (Keychain Access > System)
1. Set "When using this certificate" to "Always Trust"

### Starting the server
Start the server using `docker compose up`

### OpenAPI Specs
https://api.teamserverdown.devops.aet.cit.tum.de/swagger-ui/index.html

## Run migration
`gradle flywayMigrate`

## Run linter
`gradle sonarLintMain`

## Run formatter
| **Action**       | **Command**            |
|------------------|------------------------|
| Format files     | `gradle spotlessApply` |
| Check formatting | `gradle spotlessCheck` |

## Run tests
`gradle test`
