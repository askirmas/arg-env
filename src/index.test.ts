import { parse } from "."

describe(parse.name, () => {
  it("Buffer", () => expect(parse(
    Buffer.from("SPEC_DIRECT=direct")
  )).toStrictEqual({"SPEC_DIRECT": "direct"}))

  describe("Straight stuff", () => {
    itParse("SPEC_"                   , {})
    itParse("SPEC_EMPTY="             , {"SPEC_EMPTY": ""})
    itParse("SPEC_DIRECT=direct"      , {"SPEC_DIRECT": "direct"})
    itParse("SPEC_SINGLE='single'"    , {"SPEC_SINGLE": "single"})
    itParse("SPEC_DOUBLE=\"double\""  , {"SPEC_DOUBLE": "double"})
    itParse("SPEC_BACKTICK=`backtick`", {"SPEC_BACKTICK": "`backtick`"})
    itParse("SPEC_BASH=$'bash'"       , {"SPEC_BASH": "$'bash'"})
    itParse("SPEC_SPACE=abc def"      , {"SPEC_SPACE": "abc def"})
  })

  describe("Commented value", () => {
    itParse("SPEC_COMMENTED_VALUE=#commented" , {"SPEC_COMMENTED_VALUE": "#commented"})
    itParse("SPEC_COMMENTED_MIDDLE=comment#ed", {"SPEC_COMMENTED_MIDDLE": "comment#ed"})
    itParse("SPEC_COMMENTED_SPACE=comment #ed", {"SPEC_COMMENTED_SPACE": "comment"})
    itParse("# SPEC_COMMENT=comment"          , {})
  })

  describe("Tricky", () => {
    itParse(" SPEC_LEADING_SPACE=space"         , {"SPEC_LEADING_SPACE": "space"})
    itParse("- SPEC_LEADING_DASH=WARN"          , {})
    itParse("$SPEC_LEADING_DOLLAR=l$"           , {"$SPEC_LEADING_DOLLAR": "l$"})
    itParse("1SPEC_LEADING_DIGIT=1"             , {"1SPEC_LEADING_DIGIT": "1"})
    itParse("=SPEC_LEADING_EQ=WARN"             , {})
    itParse("SPEC_ONELINE_1=1; SPEC_ONELINE_2=1", {"SPEC_ONELINE_1": "1; SPEC_ONELINE_2=1"})
    itParse("SPEC_SUBSHELL=$(echo 1)"           , {"SPEC_SUBSHELL": "$(echo 1)"})
  })

  describe("Not standard names", () => {
    itParse("SPEC_lowercase=Lowercase", {"SPEC_lowercase": "Lowercase"})
    itParse("SPEC_-=-"                , {"SPEC_-": "-"})
    itParse("SPEC_:=:"                , {"SPEC_:": ":"})
    itParse("SPEC_@=@"                , {"SPEC_@": "@"})
    itParse("SPEC_\\==`=`"            , {"SPEC_\\": "=`=`"})
  })
})

function itParse(input: string|string[], output: unknown) {
  const arg = typeof input === "string" ? input : input.join("\n")
  it(arg, () => expect(parse(
    arg
  )).toStrictEqual(output))
}
