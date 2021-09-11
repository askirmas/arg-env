#!/bin/bash
printf "[To Readme](./README.md)\n\n%s\n\n%s\n\n%s\n\n" \
"$(docker --version)" \
"$(docker-compose --version)" \
"$(uname -rs)" \
> output.md
