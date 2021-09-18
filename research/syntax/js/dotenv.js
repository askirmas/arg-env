#!/usr/bin/env node
const {config} = require("dotenv")
, {assign: $assign, entries: $entries} = Object

if (!module.parent)
  console.log(main())

function main() {
  const collected = {}
  /** @type {Record<string, string>} */
  const {argv} = process

  for (let i = 2; i < argv.length; i++)
    $assign(collected, config({"path": argv[i]}).parsed)

  return $entries(collected)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")
}
