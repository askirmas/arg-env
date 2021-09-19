#!/bin/bash
set -e
docker-compose build specs
docker-compose run --rm specs > spec.json
set +e
