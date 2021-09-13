#!/bin/bash
export ENV_EXPORT=global
export ENV_EXPORT_2=global
export OVERRIDE_EXPORT_ROOT=global
export OVERRIDE_EXPORT_INLINE=global
export OVERRIDE_EXPORT_INTERNAL=global
export OVERRIDE_EXPORT_DOCKER=global
# --build-arg
docker-compose build envs_propagation
# `docker compose` doesn't see `-e ENV_EXPORT`
ENV_RUN=global docker-compose run --rm \
-e ENV_EXPORT \
-e ENV_RUN \
-e OVERRIDE_EXPORT_ROOT \
-e OVERRIDE_EXPORT_INLINE \
-e OVERRIDE_EXPORT_INTERNAL \
-e OVERRIDE_EXPORT_DOCKER \
envs_propagation > result.env
