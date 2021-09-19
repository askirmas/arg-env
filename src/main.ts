import {
  fromArgs,
  fromPackageEnv
} from "./cli-utils"
import {
  parse
} from "./parse"

type Reader = (path: string) => string | Buffer

export {
  main
}

function main(
  env: Env,
  argv: string[],
  reader: Reader,
  deleteArgs: boolean
) {
  assigner(env, fromArgs(argv, deleteArgs), reader)
  assigner(env, fromPackageEnv(env), reader)
}

function assigner(
  env: Env,
  files: string[],
  reader: Reader
) {
  const {length} = files

  for (let i = length; i--;) {
    const envPatch = parse(reader(files[i]), undefined, undefined)

    for (const key in envPatch) {
      if (key in env)
        continue
      env[key] = envPatch[key]
    }
  }
}
