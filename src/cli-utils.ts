import type { Env } from "./types"

const argStart = 2
, argPrefix = "--env-file="
, {"length": argPrefixLength} = argPrefix
, packagePrefix = "npm_package_env_file_"

export {
  fromArgs,
  fromPackageEnv
}

function fromArgs<T extends boolean>(
  argv: typeof process["argv"],
  deleteThem: T
) {
  const {length} = argv
  // CONSIDER `Set`
  , collected: string[] = []
  , indexesToDelete = deleteThem ? [] as number[] : undefined

  for (let i = argStart; i < length; i++) {
    const arg = argv[i]

    if (!arg.startsWith(argPrefix))
      continue

    collected.push(arg.substr(argPrefixLength))
    deleteThem && indexesToDelete!.push(i)
  }

  const lengthToDelete = indexesToDelete?.length

  if (lengthToDelete) {
    let deleteIndex = 0
    , curIndex = indexesToDelete[0]

    for (let preIndex = curIndex; preIndex < length; preIndex++) {
      while (preIndex === indexesToDelete[deleteIndex]) {
        preIndex++
        deleteIndex++
      }

      argv[curIndex] = argv[preIndex]
      curIndex++
    }

    argv.length -= lengthToDelete
  }

  return collected
}

/**
 * @todo Consider calculation as in compose.yml
 */
function fromPackageEnv(env: Env) {
  const collected: string[] = []

  let i = 0
  , key = `${packagePrefix}${i}`

  while (key in env) {
    collected[i] = env[key]!
    i++
    key = `${packagePrefix}${i}`
  }

  return collected
}
