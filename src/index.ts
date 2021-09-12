type RegExpGroups<Groups extends string> = RegExpExecArray & {groups: Record<Groups, string>}

const parser = /^\s*([^\s=]+)=(?<quote>['"]?)(?<value>.*)(\k<quote>)/gm
, commentsStripper = /\s#.*/
, exprParse = /\$\{([^\}]+)\}/

export {
  parse
}

function parse<K extends string>(
  src: Buffer | string
): Record<K, string> {
  // TODO Line
  const source = typeof src === "string" ? src : src.toString()
  , $return = {} as Record<string, string>

  let parsed: ReturnType<RegExp["exec"]>

  while (parsed = parser.exec(source)) {
    const {1: key, "groups": {
      value
    }} = parsed as RegExpGroups<"value"|"quote">

    $return[key] = value
    .replace(commentsStripper, "")
    .replace(exprParse, (_, variable: string) => {
      return variable in $return ? $return[variable] : ""
    })
  }

  return $return
}
