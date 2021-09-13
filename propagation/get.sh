#!/bin/bash
export ENV_EXPORT=global
export ENV_EXPORT_2=global
export EXPORT_OVERRIDE_ROOT=global
export EXPORT_OVERRIDE_INLINE=global
export EXPORT_OVERRIDE_INTERNAL=global
export EXPORT_OVERRIDE_DOCKER=global
# --build-arg
docker-compose build envs_propagation
# `docker compose` doesn't see `-e ENV_EXPORT`
ENV_RUN=global docker-compose run --rm \
-e ENV_EXPORT \
-e ENV_RUN \
-e EXPORT_OVERRIDE_ROOT \
-e EXPORT_OVERRIDE_INLINE \
-e EXPORT_OVERRIDE_INTERNAL \
-e EXPORT_OVERRIDE_DOCKER \
envs_propagation > result.env
