import * as Interfaces from '../../interfaces'
import { FakeRepository } from '../../repositories/fake-repository/fake-repository'
import * as TreeConstants from './tree-constants'

const repository: Interfaces.IRepository = new FakeRepository

export const collapse = (tree: Immutable.Map<string, any>) => {
  return {
    type: TreeConstants.TREE_COLLAPSE,
    tree
  }
}

export const expand = (tree: Immutable.Map<string, any>) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_EXPAND, tree })
    return repository.getChildren(tree.get('id'))
      .then((children: Interfaces.IItem[]) => {
        dispatch(fetchResponse(tree, children))
      })
      .catch((reason: any) => {
        dispatch(fetchFailure(reason))
      })
  }
}

export const fetchResponse = (tree: Immutable.Map<string, any>, children: Interfaces.IItem[]) => {
  return {
    type: TreeConstants.TREE_FETCH_RESPONSE,
    tree,
    children
  }
}

export const fetchFailure = (reason: any) => {
  return {
    type: TreeConstants.TREE_FETCH_FAILURE,
    reason
  }
}