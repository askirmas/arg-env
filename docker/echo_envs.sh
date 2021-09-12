#!/bin/bash
# check `compgen -v` and `env` output
VARS=(
  'GLOBAL'
  $(cat .env \
  | grep --color=never '^[A-Za-z]' \
  | sed 's/=.*//')
)

for VAR in "${VARS[@]}"
do
  echo "$VAR=${!VAR}"
done
