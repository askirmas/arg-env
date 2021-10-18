const argStart = 2
, argPrefix = "--env-file="
, {"length": argPrefixLength} = argPrefix
, packagePrefix = "npm_package_config_env_file"
, envPrefix = "ENV_FILE"

/**
 * @see https://github.com/npm/cli/issues/3775
 * @see https://github.com/npm/run-script/issues/37 */
const npm7delimiter = "\n\n"

export {
  fromArgs,
  fromPackageEnv,
  fromEnv
}

function fromArgs<T extends boolean>(
  argv: typeof process["argv"],
  deleteThem: T
) {
  const {length} = argv
  // CONSIDER `collected: Set<string>`
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
  return fromArrayAsAssoc(
    env,
    packagePrefix,
    env[packagePrefix]?.split(npm7delimiter) ?? []
  )
}

function fromEnv(env: Env) {
  return fromArrayAsAssoc(
    env,
    envPrefix,
    envPrefix in env
    ? [env[envPrefix]!]
    : []
  )
}

// CONSIDER `collected: Set<string>`
function fromArrayAsAssoc(env: Env, prefix: string, collected: string[]) {
  let i = 0
  , key = `${prefix}_${i}`

  while (key in env) {
    collected.push(env[key]!)
    i++
    key = `${prefix}_${i}`
  }

  return collected
}
