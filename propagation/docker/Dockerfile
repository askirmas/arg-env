FROM alpine:3

ENV ENV_DOCKER=docker/Dockerfile
ENV EXPORT_OVERRIDE_DOCKER=docker/Dockerfile
ENV ROOT_OVERRIDE_DOCKER=docker/Dockerfile
ENV INLINE_OVERRIDE_DOCKER=docker/Dockerfile
ENV INTERNAL_OVERRIDE_DOCKER=docker/Dockerfile

RUN apk update && apk upgrade && apk add bash

CMD env | grep "_" | sort
