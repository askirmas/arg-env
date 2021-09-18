FROM alpine:3

### <vars id=DOCKER value=Dockerfile prefix=ENV/>

RUN apk update && apk upgrade && apk add bash

CMD env | grep "_" | sort
