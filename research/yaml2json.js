#!/usr/bin/env node
const { readSync, readFileSync } = require("fs")
, { load } = require("js-yaml")

if (!module.parent)
  console.log(main(process))

module.exports = main

/**
 * @param {{"stdin": {"fd": number}, "argv": string[]} param0
 */
function main({argv}) {
  const data = parseYamlFromStdin()
  , reversedTrajectory = argv[2]?.split("/").reverse()
  , outputData = lens(data, reversedTrajectory)
  , output = stringify(outputData)

  return output
}

function parseYamlFromStdin() {
  return load(readFileSync(
    /** > I think (pure conjecture) that process.stdin.fd is a getter that, when referenced, will put stdin in non-blocking mode (which is causing the error). When you use the file descriptor directly, you work around that.
     * @see https://stackoverflow.com/questions/40362369/stdin-read-fails-on-some-input/40363214#40363214 */
    0
  ).toString())
}

/**
 * @param {unknown} obj
 * @param {string[]} reversedTrajectory
 */
function lens(obj, reversedTrajectory) {
  if (!(reversedTrajectory?.length))
    return obj

  let key = reversedTrajectory.pop()

  if (key === "^")
    for (key in obj)
      break

  if (!key in obj)
    throw Error (`No key "${key}"`)

  return lens(obj[key], reversedTrajectory)
}

function stringify(source) {
  return JSON.stringify(source, undefined, 2)
}
