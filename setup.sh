#!/bin/bash
npm ci
./node_modules/.bin/git-hooks-wrapper init
git config include.path ../.gitconfig
