import type { PathLike } from "fs"
import { sync } from "globby"
import { appenderSync, arr2line, createLineReader, templateLine } from "../utils"

export {
  readMd
}

if (!module.parent)
  main()

async function main() {
  const templatesDir = `${__dirname}/template/`
  , files = sync(`**/*`, {
    "gitignore": true,
    "cwd": templatesDir
  })
  , vars = await readMd(`${__dirname}/input.md`)

  await appenderSync(`${__dirname}/output/input.env`)(...vars[""])

  for (const file of files) {
    const outputFile = `${__dirname}/output/${file}`
    , reader = createLineReader(`${templatesDir}${file}`)
    , append = appenderSync(outputFile)

    for await (const line of reader) {
      const templ = templateLine<"type"|"prefix">(line)

      if (!templ) {
        await append(line, "\n")
        continue
      }

      const {
        indentation,
        type = "",
        prefix = ""
      } = templ

      if (!(type in vars))
        throw Error(`Unknown type: "${type}"`)

      const vars4type = vars[type]

      await append(
        ...Object.keys(vars4type)
        .map(e => {
          const status = vars4type[e]

          return arr2line(
            indentation,
            status && status !== "-" ? "" : "#",
            prefix,
            e
          )
        })
      )
    }
  }

  return files
}

async function readMd(path: PathLike) {
  const reader = createLineReader(path)
  //@ts-expect-error
  , $return: {
    //@ts-expect-error
    "": string[]
    [x: string]: Record<string, string> //string[] | boolean
  } = {"": [] as string[]}

  let headers: undefined|string[]

  for await (const line of reader) {
    if (!line.match(/^\|([^|]*\|)+$/)) {
      headers = undefined
      continue
    }

    if (headers === undefined) {
      headers = line.split(/\s*\|\s*/)
      headers.shift()
      headers.length--

      const {length} = headers
      for (let i = 0; i < length; i++) {
        const header = headers[i]

        if (!header)
          continue

        $return[header] = {}
      }

      continue
    }

    if (line.match(/^\|(\s*\-+\s*\|)+$/))
      continue

    const cellParser = /[^\|]+/g

    let i = -1
    , key: string
    , cell: string|undefined

    while (cell = cellParser.exec(line)?.[0]) {
      i++

      const trimmed = cell
      .replace(/(^ +| +$)/g, '')
      .replace("&nbsp;", " ")
      .replace("&emsp;", "\t")

      if (i === 0) {
        if (!trimmed)
          break

        key = trimmed
        $return[""].push(trimmed)
        continue
      }

      if (!trimmed)
        continue

      $return[headers[i]][key!] = trimmed
    }
  }

  return $return
}
