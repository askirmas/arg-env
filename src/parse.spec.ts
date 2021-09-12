import { parse as dotenvParse } from "dotenv"
import dotenvExpand from "dotenv-expand"
import { readFileSync } from "fs"
import { parse } from "./parse"

const dotenvPath = "./docker/.env"
, dotenvContent = `${readFileSync(dotenvPath)}`
, dockerComposeResult = `${readFileSync("./output/docker-compose --env_file")}`
.split("\n")
.filter(x => x)

it("- dotenv", () => expect(obj2envLines(
  dotenvParse(dotenvContent)
)).not.toStrictEqual(
  dockerComposeResult
))

it("- dotenv", () => expect(obj2envLines(
  dotenvExpand({"parsed": dotenvParse(dotenvContent)}).parsed
)).not.toStrictEqual(
  dockerComposeResult
))


it("my",() => expect(obj2envLines(
  parse(dotenvContent)
)).not.toStrictEqual(
  dockerComposeResult
))

function obj2envLines(source?: Record<string, unknown>) {
  if (!source)
    return source

  const $return = []
  for (const key in source)
    $return.push(`${key}=${source[key]}`)

  return $return
}
