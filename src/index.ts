type RegExpGroups<Groups extends string> = RegExpExecArray & {groups: Record<Groups, string>}

const parser = /^\s*([^\s=]+)=(?<quote>['"]?)(?<value>.*)(\k<quote>)/gm
, commentsStripper = /\s#.*/

export {
  parse
}

function parse<K extends string>(
  src: Buffer | string
): Record<K, string> {
  // TODO Line
  const source = typeof src === "string" ? src : src.toString()
  , $return = {} as Record<K, string>

  let parsed

  while (parsed = parser.exec(source)) {
    const {1: key, "groups": {
      value
    }} = parsed as RegExpGroups<"value"|"quote">

    $return[key as K] = value
    .replace(commentsStripper, "")
  }

  return $return
}
