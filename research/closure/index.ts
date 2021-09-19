import { files } from "../files"
import {
  appenderSync,
  arr2line,
  createLineReader,
  templateLine
} from "../utils"

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

    const append = appenderSync(`${outputRoot}${path}`)

    for await (const line of createLineReader(`${templateRoot}${path}`)) {
      const templ = templateLine<"id"|"value"|"prefix"|"postfix">(line)

      if (!templ) {
        await append(line, "\n")
        continue
      }

      const {
        indentation,
        id,
        value,
        prefix,
        postfix
      } = templ
      , valueStr = value ? `=${value}` : ""

      await append(
        arr2line(indentation, prefix, `ENV_${id}${valueStr}`, postfix)
      )

      for (const key in files) {
        if (key === id)
          continue
        await append(
          arr2line(indentation, prefix, `${id}_CATCH_${key}${value ? `=\${ENV_${key}}` : ""}`, postfix)
        )
      }
    }
  }
}
