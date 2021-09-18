#!/bin/bash
rm -rf ../result
mkdir ../result

### <vars value=export id=EXPORT prefix=export/>

# --build-arg
docker-compose build envs_propagation

# `docker compose` doesn't see `-e ENV_EXPORT`
### <vars value=run id=RUN postfix=\ />
docker-compose run --rm \
### <vars id=RUN prefix=-e postfix=\ />
### <vars id=EXPORT prefix=-e postfix=\ />
envs_propagation > ../result/result.json

### <vars type=run value=run id=RUN/>
docker-compose config > ../result/result.yml
