#!/bin/bash
set -x
set -e

rm -rf result
mkdir result

cd output

# Scripts stuff

bash shell.sh > ../result/bash.json
sh shell.sh > ../result/sh.json
zsh shell.sh > ../result/zsh.json

# Run dockers

cd docker

docker build --tag docker-env_file --file Dockerfile .
docker run --rm --env-file=../docker.env docker-env_file > "../../result/docker-env_file.json"

docker build --tag docker-env --file Dockerfile.injected .
docker run --rm docker-env > "../../result/docker-env.json"

cd ..

# Run services

cd compose

docker-compose build environment && \
docker-compose run --rm environment > "../../result/compose-environment.json"

## TODO replace with raw env
docker-compose build env_file-shell && \
docker-compose run --rm env_file-shell > "../../result/compose-env_file-shell.json"

docker-compose build env_file-docker && \
docker-compose run --rm env_file-docker > "../../result/compose-env_file-docker.json"

#docker-compose build env_injected
#docker-compose run --rm env_injected > "../output/docker-compose ENV"

# Other executions give the same result
#docker compose build env_file
#docker compose run --rm env_file > "../output/docker compose --env_file"

docker-compose config > "../../result/compose.yml"

cd ..

# JS stuff
cd ..
./js/dotenv.js output/shell.env > "result/dotenv.json"
./js/dotenv-expand.js docker-compose/.env output/shell.env > "result/dotenv_expanded.json"

set +x
set +e
