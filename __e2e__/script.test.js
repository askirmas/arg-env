const { execSync } = require("child_process");
const {value} = require("./script")

it("import", () => expect(value).toBe(
  "arg env is cool !!!!!111"
))

it("from npm", () => expect(
  execSync("npm run --silent run").toString()
).toBe(
  "arg env is cool !!!!!111\n"
))
