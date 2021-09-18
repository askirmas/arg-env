#!/usr/bin/env node
const {config} = require("dotenv")
, expand = require("dotenv-expand")
, {assign: $assign} = Object

if (!module.parent)
  console.log(JSON.stringify(main(), null, 2))

function main() {
  const collected = {}
  /** @type {Record<string, string>} */
  const {argv} = process

  for (let i = 2; i < argv.length; i++) {
    $assign(collected, expand(config({"path": argv[i]})).parsed)
  }

  return collected
}
