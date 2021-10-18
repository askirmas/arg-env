import {
  fromArgs,
  fromPackageEnv
} from "./cli-utils"

describe(fromArgs.name, () => {
  it("empty", () => expect(fromArgs([
  ], false)).toStrictEqual([
  ]))

  it("nothing", () => expect(fromArgs([
    'bin/node',
    'script',
    "--runInBand",
    "abc"
  ], false)).toStrictEqual([
  ]))

  it("1", () => expect(fromArgs([
    'bin/node',
    'script',
    '--env-file=xxx yyy',
    "--runInBand",
    "--env-file=xxx yyy",
    "abc"
  ], false)).toStrictEqual([
    'xxx yyy',
    "xxx yyy",
  ]))

  it("with delete", () => {
    const args = [
      'bin/node',
      'script',
      '--env-file=xxx yyy',
      "--runInBand",
      "abc",
      "--env-file=xxx"
    ]
    fromArgs(args, true)
    expect(args).toStrictEqual([
      'bin/node',
      'script',
      "--runInBand",
      "abc"
    ])
  })
})

describe(fromPackageEnv.name, () => {
  it("gap", () => expect(fromPackageEnv({
    "npm_package_config_env_file_3": "d",
    "npm_package_config_env_file_0": "a",
    "npm_package_config_env_file_1": "b",
  })).toStrictEqual([
    "a",
    "b",
  ]))

  it("letter", () => expect(fromPackageEnv({
    "npm_package_config_env_file_0": "a",
    "npm_package_config_env_file_1": "b",
    "npm_package_config_env_file_a": "g",
  })).toStrictEqual([
    "a",
    "b",
  ]))

  it("long list", () => expect(fromPackageEnv({
    "npm_package_config_env_file_2": "c",
    "npm_package_config_env_file_3": "d",
    "npm_package_config_env_file_0": "a",
    "npm_package_config_env_file_1": "b",
    "npm_package_config_env_file_6": "g",
    "npm_package_config_env_file_7": "h",
    "npm_package_config_env_file_4": "e",
    "npm_package_config_env_file_5": "f",
    "npm_package_config_env_file_11": "m",
    "npm_package_config_env_file_10": "l",
    "npm_package_config_env_file_8": "",
    "npm_package_config_env_file_9": "k"
  })).toStrictEqual([
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "",
    "k",
    "l",
    "m"
  ]))

  /**
   * @see https://github.com/npm/cli/issues/3775
   * @see https://github.com/npm/run-script/issues/37 */
  it("#2 npm 7", () => expect(fromPackageEnv({
    "npm_package_config_env_file": "1\n\n2\n\n3"
  })).toStrictEqual([
    "1", "2", "3"
  ]))
})
