# Build stage
FROM golang:1.22-alpine AS builder

WORKDIR /app

# Copy module files
COPY go.mod ./
RUN go mod download

# Copy source files
COPY *.go ./

# Build binary
RUN CGO_ENABLED=0 GOOS=linux go build -o server .

# Final stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates tzdata

WORKDIR /root/

COPY --from=builder /app/server .

EXPOSE 8000

ENV PORT=8000

CMD ["./server"]
