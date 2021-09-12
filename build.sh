#!/bin/bash
./output_md-start.sh \
&& ./get_envs.sh \
&& npm run test \
&& npm run output \
