FROM alpine:3

RUN apk update && apk upgrade && apk add bash

WORKDIR /app
COPY echo_envs.sh .env ./

# <envfile>

CMD ./echo_envs.sh
