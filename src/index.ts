import { readFileSync } from "fs"
import { main } from "./main"
export { parse } from "./parse"

main(
  process.env,
  process.argv,
  readFileSync,
  false
)
