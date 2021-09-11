#!/bin/bash
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

# `run --env GLOBAL=global` changes nothing
docker build --tag env_file --file Dockerfile .
docker run --rm --env-file=../docker-compose/.env --env-file=.env env_file > ../output/docker-env_file

docker build --tag env_injected --file Dockerfile.injected .
docker run --rm env_injected > ../output/docker-env_injected

cd ..

# Run services

cd docker-compose || exit 1

docker-compose build env_file
docker-compose run --rm env_file > ../output/docker_compose-env_file

docker-compose build env_injected
docker-compose run --rm env_injected > ../output/docker_compose-env_injected

docker-compose build injected
docker-compose run --rm injected > ../output/docker_compose-injected

cd ..

# cat docker-compose.yml | grep --after-context=100 --color=never 'environment:'  
# cat docker-compose.yml | pcregrep --color=never -o '(?<=environm)ent:.*$'