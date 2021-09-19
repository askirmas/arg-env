#!/bin/bash
docker-compose build specs && \
docker-compose run --rm specs > spec.json
