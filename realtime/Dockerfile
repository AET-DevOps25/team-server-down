FROM golang:1.24-alpine
RUN apk add --no-cache curl
RUN curl -v https://proxy.golang.org

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod download

COPY . .
ENV CGO_ENABLED=0
RUN go build -o realtime ./cmd/api/main.go

FROM scratch AS runner

WORKDIR /app

COPY --from=builder /app/realtime .

ENTRYPOINT [ "./realtime" ]