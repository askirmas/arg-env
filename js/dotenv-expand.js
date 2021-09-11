#!/usr/bin/env node
const {config} = require("dotenv")
, expand = require("dotenv-expand")
, {assign: $assign, entries: $entries} = Object

if (!module.parent)
  console.log(main())

function main() {
  const collected = {}
  /** @type {Record<string, string>} */
  const {argv} = process

  for (let i = 2; i < argv.length; i++) {
    $assign(collected, expand(config({"path": argv[i]})).parsed)
  }

  return $entries(collected)
  .map(([key, value]) => `${key}=${value}`)
  .join("\n")
}
