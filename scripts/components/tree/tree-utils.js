'use strict'

const Immutable = require('immutable')

const InitialState = require('../../initial-state')
const TreeConstants = require('./tree-constants')

const children = (state, path) => {
  if (!state || !path) return Immutable.OrderedMap()
  const nextLevel = path.split('/').length + 1
  const tree = state.get('tree')
  return tree.filter((v) => {
    const p = v.get('path')
    return p.startsWith(path + '/') && p.split('/').length === nextLevel
  })
}

const getIdFromPath = (path) => {
  const splittedPath = path.split('/')
  const lastIndex = splittedPath.length - 1
  return splittedPath[lastIndex]
}

module.exports = {
  children,
  getIdFromPath
}
