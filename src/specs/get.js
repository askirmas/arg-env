console.log(JSON.stringify(main(), null, 2))

function main() {
  const {env} = process
  , $return = {}

  for (const key in env)
    if (key.includes("SPEC_"))
      $return[key] = env[key]

  return $return
}
