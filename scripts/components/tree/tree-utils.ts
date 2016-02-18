import { IState } from '../../interfaces'
import * as Immutable from 'immutable'

import InitialState from '../../initial-state'
import * as TreeConstants from './tree-constants'

export const children = (state: IState, path: string): Immutable.OrderedMap<string, any> => {
  if (!state || !path) return Immutable.OrderedMap<string, any>()
  const nextLevel = path.split('/').length + 1
  const tree = state.get('tree')
  return tree.filter((v) => {
    const p = v.get('path')
    return p.startsWith(path + '/') && p.split('/').length === nextLevel
  })
}

export const getIdFromPath = (path: string): string => {
  const splittedPath = path.split('/')
  const lastIndex = splittedPath.length - 1
  return splittedPath[lastIndex]
}