import { main } from "./main"

describe(main.name, () => {
  it("1", () => {
    const files: Record<string, string> = {
      "npm0": "OVERRIDE=true",
      "npm1": "NPM1=Loaded",
      "arg0": "ARG0=Loaded",
      "arg1": "ARG1=Loaded",
    }
    , env = {
      "npm_package_env_file_0": "npm0",
      "npm_package_env_file_1": "npm1",
      "OVERRIDE": "false"
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
      "OVERRIDE": "false"
    })
    expect(argv).toStrictEqual([
      "node", "script"
    ])
  })
})
