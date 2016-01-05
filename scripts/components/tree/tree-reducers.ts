import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'
import { InitialState } from '../../initial-state'

const pathReducer = (tree: TreeInterfaces.ITree, id: string, index: number, array: string[]): TreeInterfaces.ITree => {
    const child: TreeInterfaces.ITree = tree.children.filter(
      (x: TreeInterfaces.ITree) => x.id === id)[0]
    return child
}

const findNode = (path: string, tree: TreeInterfaces.ITree): TreeInterfaces.ITree => {
  const initialValue: TreeInterfaces.ITree = { id: '', path: '', name: '', children: [tree] }
  const node: TreeInterfaces.ITree = path.split('/').reduce(pathReducer, initialValue)
  if (node.path === path) {
    return node
  }
  return undefined
}

export const TreeReducer = (state: Immutable.Map<string, any>, action: any) => {
  console.info('action', action)
  
  if (!state) state = InitialState

  if (action.type === '@@redux/INIT') return state

  const tree: TreeInterfaces.ITree = state.get('tree').toJS()
  const node: TreeInterfaces.ITree = findNode(action.tree.get('path'), tree)

  switch (action.type) {
    case TreeConstants.TREE_COLLAPSE:
      if (node.children.length > 0) {
        node.children = []
        return state.set('tree', Immutable.fromJS(tree))
      }
      return state

    case TreeConstants.TREE_EXPAND:
      node.loading = true
      return state.set('tree', Immutable.fromJS(tree))
      
    case TreeConstants.TREE_SELECT:
      return state.set('currentTreeNode', Immutable.fromJS(node))

    case TreeConstants.TREE_FETCH_RESPONSE:
      delete node.loading

      action.children.map((child) => {
        node.children.push({
          id: child.ID,
          name: child.Name,
          path: node.path + '/' + child.ID,
          children: []
        })
      })

      return state.set('tree', Immutable.fromJS(tree))

    case TreeConstants.TREE_FETCH_FAILURE:
      console.error(action.reason)
      console.warn('TODO: change root to loaded.')
      return state

    default:
      return state
  }
}