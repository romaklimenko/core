'use strict'

const perf = (func, message) => {
  const start = performance.now()
  const result = func()
  const end = performance.now()
  console.info(message, end - start)
  return result
}

module.exports = perf
