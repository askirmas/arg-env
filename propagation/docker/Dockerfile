FROM alpine:3

ENV ENV_DOCKERFILE="docker/Dockerfile"

RUN apk update && apk upgrade && apk add bash

CMD env | grep "ENV_"
