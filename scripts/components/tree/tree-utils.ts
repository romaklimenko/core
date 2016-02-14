import * as Immutable from 'immutable'

import InitialState from '../../initial-state'
import * as TreeConstants from './tree-constants'

export const children = (state, path) => {
  if (!state || !path) return Immutable.OrderedMap()
  const nextLevel = path.split('/').length + 1
  const tree = state.get('tree')
  return tree.filter((v) => {
    const p = v.get('path')
    return p.startsWith(path + '/') && p.split('/').length === nextLevel
  })
}

export const getIdFromPath = (path) => {
  const splittedPath = path.split('/')
  const lastIndex = splittedPath.length - 1
  return splittedPath[lastIndex]
}