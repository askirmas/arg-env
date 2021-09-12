import { parse } from "."

const {isArray: $isArray} = Array

describe(parse.name, () => {
  describe("Complex input", () => {
    it(...p(Buffer.from("SPEC_DIRECT=direct"), {"SPEC_DIRECT": "direct"}))
    it(...p(["A=1", "B=2"], {"A": "1", "B": "2"}))
  })

  describe("Straight stuff", () => {
    it(...p("SPEC_"                   , {}))
    it(...p("SPEC_EMPTY="             , {"SPEC_EMPTY": ""}))
    it(...p("SPEC_DIRECT=direct"      , {"SPEC_DIRECT": "direct"}))
    it(...p("SPEC_SINGLE='single'"    , {"SPEC_SINGLE": "single"}))
    it(...p("SPEC_DOUBLE=\"double\""  , {"SPEC_DOUBLE": "double"}))
    it(...p("SPEC_BACKTICK=`backtick`", {"SPEC_BACKTICK": "`backtick`"}))
    it(...p("SPEC_BASH=$'bash'"       , {"SPEC_BASH": "$'bash'"}))
    it(...p("SPEC_SPACE=abc def"      , {"SPEC_SPACE": "abc def"}))
  })

  describe("Commented value", () => {
    it(...p("SPEC_COMMENTED_VALUE=#commented" , {"SPEC_COMMENTED_VALUE": "#commented"}))
    it(...p("SPEC_COMMENTED_MIDDLE=comment#ed", {"SPEC_COMMENTED_MIDDLE": "comment#ed"}))
    it(...p("SPEC_COMMENTED_SPACE=comment #ed", {"SPEC_COMMENTED_SPACE": "comment"}))
    it(...p("# SPEC_COMMENT=comment"          , {}))
  })

  describe("Tricky", () => {
    it(...p("SPEC_ONELINE_1=1; SPEC_ONELINE_2=1", {"SPEC_ONELINE_1": "1; SPEC_ONELINE_2=1"}))
    it(...p("SPEC_SUBSHELL=$(echo 1)"           , {"SPEC_SUBSHELL": "$(echo 1)"}))
    it(...p(" SPEC_LEADING_SPACE=space"         , {"SPEC_LEADING_SPACE": "space"}))
    it(...p("- SPEC_LEADING_DASH=WARN"          , {}))
    it(...p("$SPEC_LEADING_DOLLAR=l$"           , {"$SPEC_LEADING_DOLLAR": "l$"}))
    it(...p("1SPEC_LEADING_DIGIT=1"             , {"1SPEC_LEADING_DIGIT": "1"}))
    it(...p("=SPEC_LEADING_EQ=WARN"             , {}))
    it.skip(...p("SPEC_UNQUOTED=\" #WARN"            , {}))
    it.skip(...p('"SPEC_ESCAPE": "\""'               , {"SPEC_ESCAPE": "\""}))
  })

  describe("Not standard names", () => {
    it(...p("SPEC_lowercase=Lowercase", {"SPEC_lowercase": "Lowercase"}))
    it(...p("SPEC_-=-"                , {"SPEC_-": "-"}))
    it(...p("SPEC_:=:"                , {"SPEC_:": ":"}))
    it(...p("SPEC_@=@"                , {"SPEC_@": "@"}))
    it(...p("SPEC_\\==`=`"            , {"SPEC_\\": "=`=`"}))
  })

  describe("Reuse", () => {
    it(...p("Straight", [
      "SPEC_ASSIGNED=assigned",
      "SPEC_REUSE_DIRECT=$SPEC_ASSIGNED",
      "SPEC_REUSE_SINGLE='$SPEC_ASSIGNED'",
      "SPEC_REUSE_DOUBLE=\"$SPEC_ASSIGNED\"",
      "SPEC_REUSE_CURVES=${SPEC_ASSIGNED}",
      "SPEC_REUSE_EXPR=${SPEC_ASSIGNED} is ${SPEC_ASSIGNED}",
      "SPEC_REUSE_EXPR_2=${X} is not ${SPEC_ASSIGNED}"
    ], {
      "SPEC_ASSIGNED": "assigned",
      "SPEC_REUSE_DIRECT": "$SPEC_ASSIGNED",
      "SPEC_REUSE_SINGLE": "$SPEC_ASSIGNED",
      "SPEC_REUSE_DOUBLE": "$SPEC_ASSIGNED",
      "SPEC_REUSE_CURVES": "assigned",
      "SPEC_REUSE_EXPR": "assigned is assigned",
      "SPEC_REUSE_EXPR_2": " is not assigned",
    }))
  })

  describe("Defaults and Errors",() => {
    it(...p("Done", [
      "SPEC_ASSIGNED=assigned",
      // Works
      "SPEC_DEFAULT_FALSY_0=${SPEC_ASSIGNED:-def}",
      "SPEC_DEFAULT_FALSY_1=${X:-${SPEC_ASSIGNED}}",
      // Whatever
      "SPEC_DEFAULT_UNDEF_0=${SPEC_ASSIGNED-def}",
      "SPEC_ERROR_FALSY_0=${SPEC_ASSIGNED?def}",
      "SPEC_DEFAULT_UNDEF_1=${X-${SPEC_ASSIGNED}}",
      "SPEC_ERROR_UNDEF_1=${X?${SPEC_ASSIGNED}}",
    ], {
      "SPEC_ASSIGNED": "assigned",
      // Works
      "SPEC_DEFAULT_FALSY_0": "assigned",
      "SPEC_DEFAULT_FALSY_1": "${SPEC_ASSIGNED}",
      // Whatever
      "SPEC_DEFAULT_UNDEF_0": "",
      "SPEC_ERROR_FALSY_0": "",
      "SPEC_DEFAULT_UNDEF_1": "}",
      "SPEC_ERROR_UNDEF_1": "}"
    }))

    it.skip(...p("Ununderstandable Errors", [
      "SPEC_ASSIGNED=assigned",
      "SPEC_ERROR_UNDEF_0=${SPEC_ASSIGNED:?def}",
      "SPEC_ERROR_FALSY_1=${X:?${SPEC_ASSIGNED}}"
    ], {
      "SPEC_ASSIGNED": "assigned",
      "SPEC_ERROR_UNDEF_0": "${SPEC_ASSIGNED:?def}",
      "SPEC_ERROR_FALSY_1": "${X:?assigned}"
    }))
  })
})


function p(input: Buffer|string|string[], output: unknown): ReturnType<typeof _p>
function p(title: string, input: Buffer|string|string[], output: unknown): ReturnType<typeof _p>
function p(...args: any[]) {
  //@ts-expect-error
  return _p(...args.reverse())
}

function _p(output: unknown, input: Buffer|string|string[], title?: string) {
  const arg = $isArray(input) ? input.join("\n") : input
  return [`${title ?? arg}`, () => expect(parse(
    arg
  )).toStrictEqual(output)] as const
}
