'use strict'

const Immutable = require('immutable')

const InitialState = require('../../initial-state')
const TreeConstants = require('./tree-constants')

const TreeReducer = (state, action) => {
  if (!state) state = InitialState

  if (action.type === '@@redux/INIT') { return state }

  switch (action.type) {
    case TreeConstants.TREE_COLLAPSE:
      const tree = state.get('tree')
        .filterNot(v => v.get('path').startsWith(action.path + '/'))
      return state.set('tree', tree)

    case TreeConstants.TREE_EXPAND:
      return state.setIn(['tree', action.path, 'loading'], true)

    case TreeConstants.TREE_SELECT:
      return state.set('currentTreeNode', Immutable.fromJS(action.path))

    case TreeConstants.TREE_FETCH_RESPONSE:
      let newState = state
      action.children.map(v => {
        newState = newState.setIn(
          ['tree', v.LongID],
          Immutable.fromJS({
            id: v.ID,
            name: v.DisplayName,
            path: v.LongID,
            hasChildren: v.HasChildren,
            data: v
          }))
      })
      return newState.setIn(['tree', action.path, 'loading'], false)

    case TreeConstants.TREE_FETCH_FAILURE:
      console.error(action.reason)
      console.warn('TODO: change root to loaded.')
      console.warn('TODO: show message.')
      return state

    default:
      return state
  }
}

module.exports = { TreeReducer }
