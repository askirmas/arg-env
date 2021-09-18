import { execSync } from "child_process"
import { appendFileSync, readFileSync, writeFileSync } from "fs"
import {
  envPath,
  eol,
  outputDir
} from "../../config"

type AssocCell = string|undefined|null
type AssocRecord = Record<string, AssocCell>
type AssocTable = Record<string, AssocRecord>

if (!module.parent)
  main()

export { }

function main() {
  const collected = collect()
  , table = json2Table(collected)
  , md2 = array2md(table)
  , md1 = array2md(transpose(table))

  writeFileSync(`${outputDir}.json`, JSON.stringify(collected, null, 2))
  appendFileSync(`${outputDir}.md`, md1)
  appendFileSync(`${outputDir}.md`, "\n\n")
  appendFileSync(`${outputDir}.md`, md2)
}

function collect() {
  const map: AssocTable = {}
  , files = lining(execSync(`find ${outputDir} -type f`))
  .concat(envPath)
  .sort()

  for (let i = 0; i < files.length; i++) {
    const filePath = files[i]
    , content = lining(readFileSync(filePath))
    .filter(x => x.match(/^[a-z]/i))
    , fileMap = map[filePath.replace(/^(.*)\//, "")] = {} as AssocRecord

    for (let l = 0; l < content.length; l++) {
      const [,variable, value = null] = content[l].match(/([^=]+)=?(.*)/) ?? []

      fileMap[`${variable}=`] = value
    }
  }

  return map
}

function transpose<Cell>(source: Cell[][]) {
  const $return: Cell[][] = []

  for (let i = 0; i < source.length; i++) {
    const sourceRow = source[i]
    for (let j = 0; j < sourceRow.length; j++) {
      const next = $return[j] = $return[j] ?? []
      next[i] = sourceRow[j]
    }
  }

  return $return
}

function json2Table(source: AssocTable) {
  const headers: string[] = []
  , interTable: Record<string, AssocCell[]> = {}

  for (const key in source) {
    const index = headers.push(`**${key}**`)
    , record = source[key]

    for (const prop in interTable)
      (interTable[prop] = interTable[prop] ?? [])
      .push(record[prop])

    for (const prop in record) {
      if (prop in interTable)
        continue
      (interTable[prop] = new Array(index - 1).fill(undefined))
      .push(record[prop])
    }
  }

  const table = [([undefined] as AssocCell[]).concat(headers)]
  for (const prop in interTable)
   table.push(([`**${prop}**`] as AssocCell[]).concat(interTable[prop]))

  return table
}

function array2md(array: AssocCell[][]) {
  const table: string[] = []

  for (let i = 0; i < array.length; i++) {
    table.push(row2md(array[i]))

    if (i === 0)
      table.push(row2md(new Array(array[0].length).fill("-")))
  }

  return table.join("\n")
}

function row2md(arr: AssocCell[]) {
  return `| ${
    arr
    .map(x => x?.replace?.(/([`])/g, "\\$1") ?? x)
    .map(x =>
      x === undefined ? "-"
      : x === null ? "null"
      : x === "" ? ""
      : x
    )
    .join(" | ")
  } |`
}

function lining(source: Pick<Object, "toString">) {
  return source
  .toString()
  .split(eol)
  .filter(x => x)
}
