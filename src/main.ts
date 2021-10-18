import {
  fromArgs,
  fromEnv,
  fromPackageEnv
} from "./cli-utils"
import {
  parse
} from "./parse"

export type Reader = (path: string) => string | Buffer

const {assign: $assign} = Object

export {
  main,
  assigner
}

function main(
  env: Env,
  argv: string[],
  reader: Reader,
  deleteArgs: boolean
) {
  // TODO #13
  const patches = [
    fromEnv(env),
    fromArgs(argv, deleteArgs),
    fromPackageEnv(env)
  ]
  , {length} = patches
  , envPatch: Record<string, unknown> = {}

  for (let i = 0; i < length; i++)
    assigner(
      env, 
      patches[i],
      reader,
      envPatch
    )

  $assign(env, envPatch)

  return envPatch
}

function assigner(
  env: Readonly<Env>,
  files: readonly string[],
  reader: Reader,
  envPatch: Record<string, unknown>
) {
  const {length} = files

  for (let i = length; i--; )
    // NB commutative
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
