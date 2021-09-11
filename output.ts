import { execSync } from "child_process"
import { parse } from "dotenv"
import { readFileSync, writeFileSync } from "fs"

type AssocCell = string|undefined|null
type AssocRecord = Record<string, AssocCell>
type AssocTable = Record<string, AssocRecord>

const outputDir = "./output"
, envPath = "./docker/.env"
, eol = /[\n\r]+/

if (!module.parent) 
  main()

export { }

function main() {
  const collected = collect()
  , md = array2md(json2Table(collected))

  writeFileSync(`${outputDir}.json`, JSON.stringify(collected, null, 2))
  writeFileSync(`${outputDir}.md`, md)
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
      
      fileMap[variable] = value
    }
  }

  map["dotenv"] = parse(readFileSync(envPath))

  return map
}

function json2Table(source: AssocTable) {
  const headers: string[] = []
  , interTable: Record<string, AssocCell[]> = {}

  for (const key in source) {
    const index = headers.push(key)
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
   table.push(([prop] as AssocCell[]).concat(interTable[prop]))

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
    .map(x => x && x.replace(/([`])/g, "\\$1"))
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
