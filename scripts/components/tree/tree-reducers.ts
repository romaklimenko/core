import * as TreeActions from './tree-actions'
import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'
import { InitialState } from '../../initial-state'

export const TreeReducer = (state: Immutable.Map<string, any> = InitialState, action: any) => {
  console.info('action', action)

  switch (action.type) {
    case TreeConstants.TREE_COLLAPSE: {
      const splittedPath: any[] = action.tree.get('path').split('/')
      const tree: TreeInterfaces.ITree = state.get('tree').toJS()

      const pathReducer = (tree: TreeInterfaces.ITree, id: string, index: number, array: string[]) => {
        const child: TreeInterfaces.ITree = tree.children.filter(
          (x: TreeInterfaces.ITree) => x.id === id)[0]
        return child
      }

      const child: TreeInterfaces.ITree = splittedPath.reduce(pathReducer, { children: [tree] })

      if (child.path === tree.path) {
        if (child.children.length > 0) {
          child.children = []
        }
      }

      return state.set('tree', Immutable.fromJS(tree))
    }

    case TreeConstants.TREE_EXPAND: {
      const splittedPath: any[] = action.tree.get('path').split('/')
      const tree: TreeInterfaces.ITree = state.get('tree').toJS()

      const pathReducer = (tree: TreeInterfaces.ITree, id: string, index: number, array: string[]) => {
        const child: TreeInterfaces.ITree = tree.children.filter(
          (x: TreeInterfaces.ITree) => x.id === id)[0]
        return child
      }

      const child: TreeInterfaces.ITree = splittedPath.reduce(pathReducer, { children: [tree] })

      if (child.path === tree.path) child.loading = true

      return state.set('tree', Immutable.fromJS(tree))
    }

    case TreeConstants.TREE_FETCH_REQUEST: {
      console.warn('TODO: change root to loading.')
      const tree = state.get('tree').toJS()
      
      const treeReducer = (tree: TreeInterfaces.ITree, id: string) => {
        if (tree.id === id) {
          tree.loading = true
        }
        tree.children.map((child) => treeReducer(child, id))
      }

      TreeActions.fetchRequest(action.id)
      return state.set('tree', Immutable.fromJS(tree))
    }

    case TreeConstants.TREE_FETCH_RESPONSE:
      console.warn('TODO: attach response to the tree, change root to loaded.')
      return state

    case TreeConstants.TREE_FETCH_FAILURE:
      console.error(action.reason)
      console.warn('TODO: change root to loaded.')
      return state

    default:
      return state
  }
}