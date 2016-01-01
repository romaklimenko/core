import * as Interfaces from '../../interfaces'
import { FakeRepository } from '../../repositories/fake-repository/fake-repository'
import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'

const repository: Interfaces.IRepository = new FakeRepository

export const toggleCollapsed = (path: string) => {
  return {
    type: TreeConstants.TREE_TOGGLE_COLLAPSED,
    path
  }
}

export const fetchRequest = (id: string) => { 
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_FETCH_REQUEST, id })
    return repository.getChildren(id)
      .then((children: Interfaces.IItem[]) => {
        dispatch(fetchResponse(children))
      })
      .catch((reason: any) => {
        dispatch(fetchFailure(reason))
      })
  }
}

export const fetchResponse = (children: Interfaces.IItem[]) => {
  return {
    type: TreeConstants.TREE_FETCH_RESPONSE,
    children
  }
}

export const fetchFailure = (reason: any) => {
  return {
    type: TreeConstants.TREE_FETCH_FAILURE,
    reason
  }
}