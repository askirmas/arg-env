// NB COPYPASTE!
console.log(JSON.stringify(main(), null, 2))

function main() {
  const {env} = process
  , collected = {}
  , keys = []

  for (const key in env) {
    if (!key.includes("_"))
      continue

    collected[key] = env[key]
    keys.push(key)
  }

  const {length} = keys.sort()
  , $return = {}

  for (let i = 0; i < length; i++) {
    const key = keys[i]
    $return[key] = collected[key]
  }

  return $return
}
