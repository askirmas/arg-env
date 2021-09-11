#!/bin/bash
printf "$(docker --version)\n\n$(docker-compose --version)\n\n$(uname -rs)\n\n" > output.md

rm -rf output
mkdir output

# Extract envs to separate file

cd docker-compose || exit 1

echo "# Generated" > ../docker/.env
cat docker-compose.yml \
| grep --color=never --after-context=100 'environment:' \
| grep --color=never -E '^\s*-\s[^=\s]+=.*$' \
| perl -pe 's/^[\s-]+//' \
>> ../docker/.env
# cat docker-compose.yml | grep --after-context=100 --color=never 'environment:'
# cat docker-compose.yml | pcregrep --color=never -o '(?<=environm)ent:.*$'

cd ..

# Run dockers

cd docker || exit 1

INJECTION=$(cat .env \
  | grep --color=never '^[A-Za-z]' \
  | sed 's/^/ENV /'
)

echo "# Generated" > Dockerfile.injected
while read line
do
  if [ "$line" != "# <envfile>" ]
  then
    echo "$line" >> Dockerfile.injected
  else
    echo "$INJECTION" >> Dockerfile.injected
  fi
done < Dockerfile

docker build --tag env_file --file Dockerfile .
docker run --rm --env-file=../docker-compose/.env --env-file=.env env_file > "../output/docker env_file"

docker build --tag env_injected --file Dockerfile.injected .
docker run --rm --env GLOBAL=global env_injected > "../output/docker env_injected"

cd ..

# Run services

cd docker-compose || exit 1

docker-compose build env_file
docker-compose run --rm env_file > "../output/docker-compose env_file"

docker-compose build env_injected
docker-compose run --rm env_injected > "../output/docker-compose env_injected"

docker-compose build injected
docker-compose run --rm injected > "../output/docker-compose injected"

# Other executions give the same result
docker compose build env_file
docker compose run --rm env_file > "../output/docker compose env_file"

cd ..

# JS stuff
./js/dotenv.js docker-compose/.env docker/.env > "output/dotenv"
./js/dotenv-expand.js docker-compose/.env docker/.env > "output/dotenv expanded"
