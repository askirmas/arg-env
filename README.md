# arg-env

Node.js  package to work with `.env` files same as `docker` and `docker-compose`

## Installation

*<b>NB!</b> I think Node app may control environment variables itself only in development, while in production it‘s control should be derived to appropriate profile tools, but you may have another opinion – it’s up to you.*

```bash
npm install --save-dev arg-env 
# OR
npm install --save arg-env 
```

## Usage

- [Command-line arguments:](https://github.com/askirmas/arg-env/blob/main/__e2e__/package.json#L6)

  ```bash
  node --require=arg-env index.js --env-file=1.env --env-file=2.env
  ```
  
- [package.json:](https://github.com/askirmas/arg-env/blob/main/__e2e__/package.json#L10-L13) *// **NB!** Works if script was launched with `npm` as `docker-compose` and `docker-compose.yml`*

  ```json
  {
  	"env_file": [
      "3.env",
      "./4.env"
    ],
    "scripts": {...},
    "dependencies": {...}
  }
  ```

[Result:](https://github.com/askirmas/env_file/blob/main/__e2e__/script.test.js#L6)

```javascript
// index.js
const {
  _ARG,
  _ENV,
  _IS,
  _COOL,
  _1
} = process.env

console.log(_ARG, _ENV, _IS, _COOL, _1) // arg env is cool !!!!!111
```

If you want only parser, take it with

```javascript
import { parse } from "arg-env"
```

## Comparison

Other env JS packages hasn't command-line and package interfaces, more-over, didn't behave like `docker`: [see details ./src/parse.spec.ts](https://github.com/askirmas/env_file/blob/master/src/parse.spec.ts). Input is [./src/specs/.docker.env](https://github.com/askirmas/env_file/blob/master/src/specs/.docker.env), output saved in [./src/specs/spec.json](https://github.com/askirmas/env_file/blob/master/src/specs/spec.json) via `./src/specs/get.sh`.

| Tool name                                                    | [Quotes](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L2-L9) | [Isolated](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L54) | [Inline comment](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L16-L18) | [Reuse](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L46-L51) | [Default value](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L57-L60) | [Weird names](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L22-L36) | [Error syntax](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L62-L65) | [Var of Var](https://github.com/askirmas/env_file/blob/main/src/specs/.docker.env#L68-L71) |
| ------------------------------------------------------------ | ------ | -------- | -------------- | ----- | ------------- | ----------- | ------------ | ---------- |
| [docker-compose](https://github.com/askirmas/env_file/blob/master/src/specs/spec.json) | `'`,`"` | Yes      | Yes            | Yes   | Yes           | Yes         | No           | No         |
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
