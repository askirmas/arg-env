import { parse as dotenvParse } from "dotenv"
import dotenvExpand from "dotenv-expand"
import { load as dotenvExtendedLoad } from "dotenv-extended"
import { readFileSync } from "fs"
import { parse } from "./parse"
import specs from "./specs/spec.json"

const dotenvPath = "./src/specs/.docker.env"
, dotenvContent = `${readFileSync(dotenvPath)}`
, originalEnvs = {...process.env}

afterEach(() => process.env = originalEnvs)

it("my",() => expect(
  parse(dotenvContent)
).toStrictEqual(
  specs
))

it("dotenv", () => expect(
  dotenvParse(dotenvContent)
).toStrictEqual(replaceAndOmit(
  specs, {
    "SPEC_COMMENTED_SPACE": "comment #ed",

    "SPEC_REUSE_CURVES": "${SPEC_ASSIGNED}",
    "SPEC_REUSE_EXPR": "${SPEC_ASSIGNED} is ${SPEC_ASSIGNED}",
    "SPEC_REUSE_EXPR_2": "${X} is not ${SPEC_ASSIGNED}",

    "SPEC_DEFAULT_FALSY_0": "${SPEC_ASSIGNED:-def}",
    "SPEC_DEFAULT_FALSY_1": "${X:-${SPEC_ASSIGNED}}",
    "SPEC_DEFAULT_UNDEF_0": "${SPEC_ASSIGNED-def}",
    "SPEC_DEFAULT_UNDEF_1": "${X-${SPEC_ASSIGNED}}",
    "SPEC_ERROR_FALSY_0": "${SPEC_ASSIGNED?def}",
    "SPEC_ERROR_UNDEF_1": "${X?${SPEC_ASSIGNED}}",

    "SPEC_META": "${!SPEC_NAME}",
    "SPEC_META_2": "$${!SPEC_NAME}",
    "SPEC_META_3": "${${SPEC_NAME}}",
  }, [
    "$SPEC_LEADING_DOLLAR",
    "SPEC_:",
    "SPEC_@",
    "SPEC_\\"
  ]
)))

it("dotenv-expanded", () => expect(
  dotenvExpand({"parsed": dotenvParse(dotenvContent)}).parsed
).toStrictEqual(replaceAndOmit(
  specs, {
    "SPEC_COMMENTED_SPACE": "comment #ed",

    "SPEC_REUSE_SINGLE": "assigned",
    "SPEC_REUSE_DIRECT": "assigned",
    "SPEC_REUSE_DOUBLE": "assigned",

    "SPEC_DEFAULT_FALSY_0": "assigned:-def}",
    "SPEC_DEFAULT_FALSY_1": ":-assigned}",
    "SPEC_DEFAULT_UNDEF_0": "assigned-def}",
    "SPEC_DEFAULT_UNDEF_1": "-assigned}",
    "SPEC_ERROR_FALSY_0": "assigned?def}",
    "SPEC_ERROR_UNDEF_1": "?assigned}",

    "SPEC_DOUBLE_DOLLAR": "$",
    "SPEC_DOUBLE_DOLLAR_2": "$assigned",
    "SPEC_BASH": "'bash'",
    "SPEC_SUBSHELL": "(echo 1)",

    "SPEC_META": "!SPEC_NAME}",
    "SPEC_META_2": "$!SPEC_NAME}",
    "SPEC_META_3": "SPEC_DEST}",
  }, [
    "$SPEC_LEADING_DOLLAR",
    "SPEC_:",
    "SPEC_@",
    "SPEC_\\"
  ]
)))

it("doteenv-extended", () => expect(
  dotenvExtendedLoad({
    "assignToProcessEnv": true,
    "path": dotenvPath
  })
).toStrictEqual(replaceAndOmit(
  specs, {
    "SPEC_COMMENTED_SPACE": "comment #ed",

    "SPEC_REUSE_CURVES": "${SPEC_ASSIGNED}",
    "SPEC_REUSE_EXPR": "${SPEC_ASSIGNED} is ${SPEC_ASSIGNED}",
    "SPEC_REUSE_EXPR_2": "${X} is not ${SPEC_ASSIGNED}",

    "SPEC_DEFAULT_FALSY_0": "${SPEC_ASSIGNED:-def}",
    "SPEC_DEFAULT_FALSY_1": "${X:-${SPEC_ASSIGNED}}",
    "SPEC_DEFAULT_UNDEF_0": "${SPEC_ASSIGNED-def}",
    "SPEC_DEFAULT_UNDEF_1": "${X-${SPEC_ASSIGNED}}",
    "SPEC_ERROR_FALSY_0": "${SPEC_ASSIGNED?def}",
    "SPEC_ERROR_UNDEF_1": "${X?${SPEC_ASSIGNED}}",

    "SPEC_META": "${!SPEC_NAME}",
    "SPEC_META_2": "$${!SPEC_NAME}",
    "SPEC_META_3": "${${SPEC_NAME}}",
  }, [
    "$SPEC_LEADING_DOLLAR",
    "SPEC_:",
    "SPEC_@",
    "SPEC_\\"
  ]
)))

function replaceAndOmit(source: Record<string, string>, replacement: Record<string, string>, omitKeys: string[]) {
  const $return = {...source}

  for (const key in replacement) {
    if (!(key in $return))
      throw Error(`Already no "${key}"`)

    const value = replacement[key]

    if (value === $return[key])
      throw Error(`Replacement of "${key}" to the same value`)

    $return[key] = value
  }

  for (const key of omitKeys) {
    if (!(key in $return))
      throw Error(`Already no "${key}"`)

    if (key in replacement)
      throw Error(`Redundant replacement of "${key}" due to delete`)

    delete $return[key]
  }

  return $return
}
