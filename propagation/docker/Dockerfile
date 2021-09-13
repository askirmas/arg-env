FROM alpine:3

ENV ENV_DOCKER=docker/Dockerfile
ENV OVERRIDE_EXPORT_DOCKER=docker/Dockerfile
ENV OVERRIDE_ROOT_DOCKER=docker/Dockerfile
ENV OVERRIDE_INLINE_DOCKER=docker/Dockerfile
ENV OVERRIDE_INTERNAL_DOCKER=docker/Dockerfile

RUN apk update && apk upgrade && apk add bash

CMD env | grep "_" | sort
