type RegExpGroups<Groups extends string> = RegExpExecArray & {groups: Record<Groups, string|undefined>}

const parser = /^\s*([^\s=]+)=(?<quote>['"]?)(?<value>.*?)(\k<quote>)\s#/gm

export {
  parse
}

function parse<T extends Record<string, string>>(src: Buffer | string): T {
  // TODO Line
  const source = typeof src === "string" ? src : src.toString()
  , $return = {} as T

  let parsed

  // TODO Compare speed with further `.replace(/\s#.*/, "")
  while (parsed = parser.exec(`${source} #`)) {
    const {1: key, "groups": {
      value
    }} = parsed as RegExpGroups<"value"|"quote">
    //@ts-expect-error Type 'string' cannot be used to index type 'T'
    $return[key] = value
  }

  return $return
}
