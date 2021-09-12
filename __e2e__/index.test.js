const { execSync } = require("child_process");

it("", () => expect(
  execSync("npm run --silent run").toString()
).toBe(
  "arg env is cool !!!!!111\n"
))
