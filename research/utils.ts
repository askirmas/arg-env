import type {
  PathLike
} from "fs"
import {
  createReadStream,
  existsSync,
  mkdirSync,
  promises,
  writeFileSync
} from "fs"
import { dirname } from "path"
import { createInterface } from "readline"

const {
  appendFile: $appendFile
} = promises
, templateParser = /^(?<indentation>\s*)### <vars\s+(?<options>.*)\/>/
, kvParser = /(?<key>[^\s]+)=(?<value>[^\s]+)/g

export {
  templateLine,
  kvParser,
  createLineReader,
  appenderSync,
  arr2line,
  join
}

function createLineReader(path: PathLike) {
  return createInterface(createReadStream(path))
}

function appenderSync(path: string) {
  const dir = dirname(path)

  existsSync(dir) || mkdirSync(dir, {"recursive": true})
  writeFileSync(path, "")

  return (...lines: string[]) => $appendFile(path, lines.join(""))
}

function templateLine<O extends string>(line: string) {
  const templ = templateParser.exec(line)?.groups

  if (!templ) {
    if (line.includes('### <vars '))
      throw Error(`Fix RegExp! "${line}"`)

    return false
  }

  const {
    indentation,
    options
  } = templ
  , opts = {indentation} as {indentation: string} & Partial<Record<O, string>>

  let kv: undefined|{"key": keyof typeof opts, "value": string}

  while (kv = kvParser.exec(options)?.groups as typeof kv)
    //@ts-expect-error
    opts[kv.key as O] = kv.value

  return opts
}

function arr2line(indentation = "", ...source: (undefined|string)[]) {
  return `${
    indentation
  }${
    source.filter(x => x).join(" ")
  }\n`
}


function join(...lines: Array<Buffer|string|Array<Buffer|string>>) {
  return lines
  .flat()
  .join("\n")
}
