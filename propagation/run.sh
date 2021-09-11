#!/bin/bash
export ENV_EXPORT=global
export ENV_EXPORT_2=global
# --build-arg
docker-compose build envs_propagation
# `docker compose` doesn't see `-e ENV_EXPORT`
ENV_RUN=global docker-compose run --rm -e ENV_EXPORT envs_propagation
