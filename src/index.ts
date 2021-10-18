import { readFileSync } from "fs"
import { assigner, main, Reader } from "./main"

const {assign: $assign} = Object

export { parse } from "./parse"
export { argEnv }
export default argEnv

/**
 * **NB!** args, package and ENV are already picked
 * Revert precedence
 * @param {string[]} paths
 * @param {*} [env] `= process.env`
 * @param {*} [target] `= {}`
 * @param {*} [reader] `= readFileSync`
 */
// TODO #4 Like `path.unshift(".env")`
// TODO Move to a separate module
function argEnv<T extends Record<string, unknown>>(paths: string[], env = process.env, target = {} as T, reader = readFileSync as Reader) {
  assigner(env, paths, reader, target)
  $assign(env, target)

  return target
}

main(
  process.env,
  process.argv,
  readFileSync,
  // TODO #7
  false
)
