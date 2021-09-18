#!/usr/bin/env node
const {config} = require("dotenv")
, {assign: $assign} = Object

if (!module.parent)
  console.log(JSON.stringify(main(), null, 2))

function main() {
  const collected = {}
  /** @type {Record<string, string>} */
  const {argv} = process

  for (let i = 2; i < argv.length; i++)
    $assign(collected, config({"path": argv[i]}).parsed)

  return collected
}
