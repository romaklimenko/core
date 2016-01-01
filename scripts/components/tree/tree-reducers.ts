import * as TreeActions from './tree-actions'
import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'
import { InitialState } from '../../initial-state'

export const TreeReducer = (state: Immutable.Map<string, any> = InitialState, action: any) => {
  switch (action.type) {
    case TreeConstants.TREE_TOGGLE_COLLAPSED:
      const splittedPath = action.path.split('/')
      const tree = state.get('tree').toJS()

      const pathReducer = (tree: TreeInterfaces.ITree, id: string, index: number, array: string[]) => {
        const child: TreeInterfaces.ITree = tree.children.filter(
          (x: TreeInterfaces.ITree) => x.id === id)[0]
        return child
      }

      const child = splittedPath.reduce(pathReducer, { children: [tree] })

      if (child.path === action.path) child.children = []

      return state.set('tree', Immutable.fromJS(tree))

    case TreeConstants.TREE_FETCH_REQUEST:
      console.warn('TODO: change root to loading.')
      TreeActions.fetchRequest(action.id)
      return state

    case TreeConstants.TREE_FETCH_RESPONSE:
      console.warn('TODO: attach response to the tree, change root to loaded.')
      return state

    case TreeConstants.TREE_FETCH_FAILURE:
      console.error(action.reason)
      return state

    default:
      return state
  }
}