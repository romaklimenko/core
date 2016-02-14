import * as Immutable from 'immutable'

import InitialState from '../../initial-state'
import * as TreeConstants from './tree-constants'

export const TreeReducer = (state, action) => {
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
      return state
        .set('currentTreeNode', Immutable.fromJS(action.path))
        .setIn(['tree', action.path, 'loading'], true)

    case TreeConstants.TREE_FETCH_CHILDREN_RESPONSE:
      // TODO: may be const
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

    case TreeConstants.TREE_FETCH_CHILDREN_FAILURE:
      console.error(action.reason)
      console.warn('TODO: change root to loaded.')
      console.warn('TODO: show message.')
      return state

    case TreeConstants.TREE_FETCH_ITEM_RESPONSE:
      return state
        .setIn(['tree', action.path, 'loading'], false)
        .setIn(['tree', action.path, 'id'], action.item.ID)
        .setIn(['tree', action.path, 'name'], action.item.DisplayName)
        .setIn(['tree', action.path, 'path'], action.item.LongID)
        .setIn(['tree', action.path, 'hasChildren'], action.item.HasChildren)
        .setIn(['tree', action.path, 'data'], Immutable.fromJS(action.item))

    case TreeConstants.TREE_FETCH_ITEM_FAILURE:
      console.error(action.reason)
      console.warn('TODO: change root to loaded.')
      console.warn('TODO: show message.')
      return state

    default:
      return state
  }
}