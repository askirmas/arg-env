import {
  fromArgs,
  fromPackageEnv
} from "./cli-utils"
import {
  parse
} from "./parse"

export {
  main
}

function main(
  env: Record<string, string|undefined|null>,
  argv: string[],
  reader: (path: string) => string | Buffer
) {
  const files = fromPackageEnv(env)
  // CONSIDER not collecting array
  .concat(
    fromArgs(argv, true)
  )
  , {length} = files

  for (let i = length; i--;) {
    const envPatch = parse(reader(files[i]))

    for (const key in envPatch) {
      if (key in env)
        continue
      env[key] = envPatch[key]
    }
  }
}
