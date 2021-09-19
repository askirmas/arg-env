const {
  _ARG,
  _ENV,
  _IS,
  _COOL,
  _1
} = process.env
, value = [_ARG, _ENV, _IS, _COOL, _1].join(" ")

module.exports = {
  value
}

console.log(value)
