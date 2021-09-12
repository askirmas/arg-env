import { readFileSync } from "fs"
import { main } from "./main"

main(
  process.env,
  process.argv,
  readFileSync,
  false
)
