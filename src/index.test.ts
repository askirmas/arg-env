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
    it(...p([
      "SPEC_ASSIGNED=assigned",
      "SPEC_REUSE_DIRECT=$SPEC_ASSIGNED",
      "SPEC_REUSE_SINGLE='$SPEC_ASSIGNED'",
      "SPEC_REUSE_DOUBLE=\"$SPEC_ASSIGNED\"",
      "SPEC_REUSE_CURVES=${SPEC_ASSIGNED}"
    ], {
      "SPEC_ASSIGNED": "assigned",
      "SPEC_REUSE_DIRECT": "$SPEC_ASSIGNED",
      "SPEC_REUSE_SINGLE": "$SPEC_ASSIGNED",
      "SPEC_REUSE_DOUBLE": "$SPEC_ASSIGNED",
      "SPEC_REUSE_CURVES": "assigned"
    }))
  })
})

function p(input: Buffer|string|string[], output: unknown) {
  const arg = $isArray(input) ? input.join("\n") : input
  return [`${arg}`, () => expect(parse(
    arg
  )).toStrictEqual(output)] as const
}
