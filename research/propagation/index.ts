import {
  createReadStream,
  existsSync,
  mkdirSync,
  PathLike, promises, writeFileSync
} from "fs"
import { dirname } from "path"
import { createInterface } from "readline"

type Files<ID extends string = string> = {[id in ID]: {
  "path": string|false
  "id": ID
}}

const {
  appendFile: $appendFile
} = promises
, files: Files = {
  "EXPORT": {
    "path": "get.sh",
    "id": "EXPORT",
  },
  "RUN": {
    "path": false,
    "id": "RUN",
  },
  "INLINE": {
    "path": "docker-compose.yml",
    "id": "INLINE",
  },
  "ROOT": {
    "path": ".env",
    "id": "ROOT",
  },
  // TODO "ROOT2": {},
  "INTERNAL_1": {
    "path": "docker/.file1.env",
    "id": "INTERNAL_1",
  },
  "INTERNAL_2": {
    "path": "docker/.file2.env",
    "id": "INTERNAL_2",
  },
  "DOCKER": {
    "path": "docker/Dockerfile",
    "id": "DOCKER",
  }
}

export {
  main,
  // varsMap
}

if (!module.parent)
  main()

async function main() {
  const templateRoot = `${__dirname}/template/`
  , outputRoot = `${__dirname}/output/`

  for (const id_ in files) {
    const {
      path,
    } = files[id_]

    if (!path)
      continue

    const outputFile = `${outputRoot}${path}`
    , outputDir = dirname(outputFile)

    existsSync(outputDir) || mkdirSync(outputDir, {"recursive": true})
    writeFileSync(outputFile, "")

    for await (const line of createLineReader(`${templateRoot}${path}`)) {
      const templ = /^(?<indentation>\s*)### <vars\s+(?<options>.*)\/>/.exec(line)?.groups

      if (!templ) {
        if (line.includes('### <vars '))
          throw Error(`Fix RegExp! "${line}"`)

        await $appendFile(outputFile, `${line}\n`)
        continue
      }

      const {
        indentation,
        options
      } = templ
      , kvParser = /(?<key>[^\s]+)=(?<value>[^\s]+)/g
      , opts: Record<string, string> = {}

      let kv: undefined|Record<string, string>

      while (kv = kvParser.exec(options)?.groups)
        opts[kv["key"]] = kv["value"]

      const {
        id,
        value,
        prefix,
        postfix
      } = opts
      , valueStr = value ? `=${value}` : ""

      await $appendFile(outputFile,
        arr2line(indentation, prefix, `ENV_${id}${valueStr}`, postfix)
      )

      for (const key in files) {
        if (key === id)
          continue
        await $appendFile(outputFile, `${
          arr2line(indentation, prefix, `${id}_CATCH_${key}${value ? `=\${ENV_${key}}` : ""}`, postfix)
        }${
          arr2line(indentation, prefix, `${[id, key].sort().join("_OVERRIDE_")}${valueStr}`, postfix)
        }`)
      }
    }
  }
}

function arr2line(indentation = "", ...source: string[]) {
  return `${
    indentation
  }${
    source.filter(x => x).join(" ")
  }\n`
}

function createLineReader(path: PathLike) {
  return createInterface(createReadStream(path))
}