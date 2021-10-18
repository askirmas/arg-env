# arg-env

Node.js package to work with `.env` files in the same way as [docker](https://docs.docker.com/engine/reference/commandline/run/#options) and [docker-compose](https://docs.docker.com/compose/environment-variables/) via argument `--env-file=…` in CLI, `"env_file": […]` in package.json and environment variables `ENV_FILE_?=…`

[![build@ci](https://github.com/askirmas/arg-env/workflows/build/badge.svg)](https://github.com/askirmas/arg-env/actions)
[![codecov](https://codecov.io/gh/askirmas/arg-env/branch/main/graph/badge.svg?token=MGpavfql7g)](https://codecov.io/gh/askirmas/arg-env)
[![Maintainability](https://api.codeclimate.com/v1/badges/f6a1ef03e39733e2827c/maintainability)](https://codeclimate.com/github/askirmas/arg-env/maintainability)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/askirmas/arg-env/badges/quality-score.png)](https://scrutinizer-ci.com/g/askirmas/arg-env/)
[![CodeFactor](https://www.codefactor.io/repository/github/askirmas/arg-env/badge)](https://www.codefactor.io/repository/github/askirmas/arg-env)

<!-- [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=askirmas_arg-env&metric=alert_status)](https://sonarcloud.io/dashboard?id=askirmas_arg-env) -->
<!-- [![DeepScan grade](https://deepscan.io](https://deepscan.io/) -->

[![dependencies Status](https://status.david-dm.org/gh/askirmas/arg-env.svg)](https://david-dm.org/askirmas/arg-env)
[![version](https://img.shields.io/npm/v/arg-env)](https://www.npmjs.com/package/arg-env)
[![license](https://img.shields.io/npm/l/arg-env)](https://github.com/askirmas/arg-env/blob/master/LICENSE)

## Installation

```bash
npm install --save-dev arg-env
```

## Usage

In addition, check [the example of usage](https://github.com/askirmas/arg-env/blob/main/__e2e__/script.test.js#L6)

### [Command-line arguments](https://github.com/askirmas/arg-env/blob/main/__e2e__/package.json#L6)
*See [Node docs](https://nodejs.org/api/cli.html#cli_r_require_module)*

```bash
node --require=arg-env index.js --env-file=1.env --env-file=2.env

# jest
node -r arg-env node_modules/.bin/jest --env-file=test.env
```

### [package.json](https://github.com/askirmas/arg-env/blob/main/__e2e__/package.json#L10-L13)

*See [npm docs](https://docs.npmjs.com/cli/v7/configuring-npm/package-json#config)*

```json
{
  "config": {
    "env_file": [
      "3.env",
      "./4.env"
    ]
  },
  "scripts": {
    "start:dev": "node --require=arg-env index.js"
  }
}
```

### Parser only

```javascript
import { parse } from "arg-env"
```

## Features

<u>*All specifications are taken from output of actual docker run*</u>

### Syntax

- Comments: [`COMMENTED=comment #ed`](https://github.com/askirmas/arg-env/blob/main/src/specs/input.env#19) is resolved to [`comment`](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json#5)
- Quote agnostic: [`V1=val`,`V2='val'`,`V3="val"`](https://github.com/askirmas/arg-env/blob/main/src/specs/input.env#L4-L6) are resolved to [`val`](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json#L27-30)
- Reuse: [`EXPR=${VAR1} and ${VAR2}`](https://github.com/askirmas/arg-env/blob/main/src/specs/input.env#L51-L52) is resolved to [`value1 and value2`](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json#L22-L23)
- Default value: [`DEFAULT=${UNDEFINED:-val}`](https://github.com/askirmas/arg-env/blob/main/src/specs/input.env#L60) is resolved to [`val`](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json#L8)

### Closure

Files are [independent](https://github.com/askirmas/arg-env/blob/main/src/main.test.ts#L82-83) but [rely](https://github.com/askirmas/arg-env/blob/main/src/main.test.ts#L84-L85) on global environment

### Precedence and overwrite

Files [don’t overwrite](https://github.com/askirmas/arg-env/blob/main/src/main.test.ts#L79) global environment. [Next file takes precedence over previous](https://github.com/askirmas/arg-env/blob/main/src/main.test.ts#L86). In addition, files in package.json has less priority than in command line arguments.

## Comparison

Other env JS packages hasn't command-line and package interfaces, more-over, didn't behave like `docker`: [see details ./src/parse.spec.ts](https://github.com/askirmas/arg-env/blob/main/src/parse.spec.ts). Input is [./src/specs/input.env](https://github.com/askirmas/arg-env/blob/main/src/specs/input.env), output saved in [./src/specs/spec.json](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json) via `./src/specs/get.sh`.

| Tool name                                                    | [Quotes](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L2-L9) | [Isolated](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L54) | [Inline comment](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L16-L18) | [Reuse](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L46-L51) | [Default value](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L57-L60) | [Weird names](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L22-L36) | [Error syntax](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L62-L65) | [Var of Var](https://github.com/askirmas/arg-env/blob/main/src/specs/.docker.env#L68-L71) |
| ------------------------------------------------------------ | ------ | -------- | -------------- | ----- | ------------- | ----------- | ------------ | ---------- |
| [docker-compose](https://github.com/askirmas/arg-env/blob/main/src/specs/spec.json) | `'`,`"` | Yes      | Yes            | Yes   | Yes           | Yes         | No           | No         |
| [arg-env](https://npmjs.com/package/arg-env)                 | `'`,`"` | Yes      | Yes            | Yes   | Yes           | Yes         | Not yet      | Not yet    |
| [dotenv](https://npmjs.com/package/dotenv)                   | `'`,`"` | Yes      | No             | No    | No            | No          | No           | No         |
| [dotenv-expand](https://npmjs.com/package/dotenv-expand)     | `'`,`"` | No?      | No             | More  | No            | No          | No           | No         |
| [dotenv-extended](https://npmjs.com/package/dotenv-extended) | `'`,`"` | No?      | No             | No    | No            | No          | No           | No         |
| [envfile](https://npmjs.com/package/envfile)                 | No     | -        | No             | No    | No            | Other       | No           | No         |

## Etc

Experiments with `.env` stuff

- Setup: [`./setup.sh`](./setup.sh)
- Build: [`./prebuild.sh`](./prebuild.sh)
   - Launch commands: [`./get_envs.sh`](./get_envs.sh)
- Result: [output.md](./output.md)

Envs list is taken from [docker-compose/docker-compose.yml](./docker-compose/docker-compose.yml) (service `injected`) and written to [docker/.env](./docker/.env)
