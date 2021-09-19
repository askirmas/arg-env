import {
  fromArgs,
  fromPackageEnv
} from "./cli-utils"
import {
  parse
} from "./parse"

type Reader = (path: string) => string | Buffer

const {assign: $assign} = Object

export {
  main
}

function main(
  env: Env,
  argv: string[],
  reader: Reader,
  deleteArgs: boolean
) {
  const envPatch: Record<string, unknown> = {}

  assigner(
    env,
    fromArgs(argv, deleteArgs),
    reader,
    envPatch
  )

  assigner(
    env,
    fromPackageEnv(env),
    reader,
    envPatch
  )

  $assign(env, envPatch)

  return envPatch
}

function assigner(
  env: Env,
  files: string[],
  reader: Reader,
  envPatch: Record<string, unknown>
) {
  const {length} = files

  for (let i = length; i--; )
    $assign(
      envPatch,
      parse(
        reader(files[i]),
        env,
        envPatch
      )
    )

  return envPatch
}
