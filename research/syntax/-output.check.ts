import { equal } from "assert"
import { readFileSync, unlinkSync } from "fs"
import { outputDir } from "../../config"

equal(
  `${readFileSync(`${outputDir}/docker env_injected`)}`,
  `${readFileSync(`${outputDir}/docker-compose env_injected`)}`
)
unlinkSync(`${outputDir}/docker env_injected`)
