type RegExpGroups<Groups extends string> = RegExpExecArray & {groups: Record<Groups, string>}

const parser = /^\s*([^\s=]+)=(?<quote>['"]?)(?<value>.*)(\k<quote>)/gm
, commentsStripper = /\s#.*/
, exprParse = /\$\{([^\}]+?)(:-([^\}]*))?\}/g

export {
  parse
}

function parse<K extends string>(
  src: Buffer | string,
  scope: undefined | Record<string, string>,
  reserved: undefined | Record<string, unknown>
): Record<K, string> {
  // TODO Line
  const source = typeof src === "string" ? src : src.toString()
  , $return = {} as Record<string, string>
  , replacer = (_: string, variable: string, __: string, $default = "") =>
    scope && variable in scope ? scope[variable]
    : variable in $return ? $return[variable]
    : $default

  let parsed: ReturnType<RegExp["exec"]>

  while (parsed = parser.exec(source)) {
    const {1: key, "groups": {
      value
    }} = parsed as RegExpGroups<"value"|"quote">

    if (
      reserved && key in reserved
      || scope && key in scope
    )
      continue

    $return[key] = value
    .replace(commentsStripper, "")
    .replace(exprParse, replacer)
  }

  return $return
}
