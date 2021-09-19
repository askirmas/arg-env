import { join } from "../research/utils"
import { main } from "./main"

describe(main.name, () => {
  it("1", () => {
    const files: Record<string, string> = {
      "npm0": "OVERWRITE=true",
      "npm1": "NPM1=Loaded",
      "arg0": "ARG0=Loaded",
      "arg1": "ARG1=Loaded",
    }
    , env = {
      "npm_package_env_file_0": "npm0",
      "npm_package_env_file_1": "npm1",
      "OVERWRITE": "false"
    }
    , argv = ["node", "script", "--env-file=arg0", "--env-file=arg1"]

    main(
      env,
      argv,
      k => files[k],
      true
    )

    expect(env).toStrictEqual({
      "npm_package_env_file_0": "npm0",
      "npm_package_env_file_1": "npm1",
      "NPM1": "Loaded",
      "ARG0": "Loaded",
      "ARG1": "Loaded",
      "OVERWRITE": "false"
    })
    expect(argv).toStrictEqual([
      "node", "script"
    ])
  })

  it("Isolation and propagation", () => {
    const env = {
      "global": "global",
      "OVERWRITE": "global"
    }
    , files: Record<string, string> = {
      "file1": join(
        "file1=file1",
        "OVERWRITE=file1",
        "file1_catch_global=${global}",
        "file1_catch_file2=${file2}",
        "file1_vs_file2=file1",
      ),
      "file2": join(
        "file2=file2",
        "OVERWRITE=file2",
        "file2_catch_global=${global}",
        "file2_catch_file1=${file1}",
        "file1_vs_file2=file2"
      )
    }
    , argv = ["node", "script", "--env-file=file1", "--env-file=file2"]

    expect(main(
      env,
      argv,
      k => files[k],
      false
    )).toStrictEqual({
      "file1": "file1",
      "file1_catch_file2": "",
      "file1_catch_global": "global",
      "file2": "file2",
      "file2_catch_file1": "",
      "file2_catch_global": "global",
      "file1_vs_file2": "file2"
    })

    expect(env).toStrictEqual({
      "global": "global",
      "OVERWRITE": "global",
      "file1": "file1",
      "file2": "file2",
      "file1_catch_file2": "",
      "file2_catch_file1": "",
      "file1_catch_global": "global",
      "file2_catch_global": "global",
      "file1_vs_file2": "file2"
    })
  })
})
