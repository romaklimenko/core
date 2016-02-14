import Repository from '../../repositories/sitecore-repository'
import * as TreeConstants from './tree-constants'
import * as TreeUtils from './tree-utils'

export const collapse = (path) => {
  return { type: TreeConstants.TREE_COLLAPSE, path }
}

export const fetchChildrenFailure = (reason) => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_FAILURE, reason }
}

export const fetchChildrenResponse = (path, children) => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_RESPONSE, path, children }
}

export const fetchItemFailure = (reason) => {
  return { type: TreeConstants.TREE_FETCH_ITEM_FAILURE, reason }
}

export const fetchItemResponse = (path, item) => {
  return { type: TreeConstants.TREE_FETCH_ITEM_RESPONSE, path, item }
}

export const expand = (path) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_EXPAND, path })
    return Repository.getChildren(TreeUtils.getIdFromPath(path))
      .then( (children) => { dispatch(fetchChildrenResponse(path, children)) })
      .catch((reason)   => { dispatch(fetchChildrenFailure(reason)) })
  }
}

export const select = (path) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_SELECT, path })
    return Repository.getItem(TreeUtils.getIdFromPath(path))
      .then( (item)   => { dispatch(fetchItemResponse(path, item)) })
      .catch((reason) => { dispatch(fetchItemFailure(reason)) })
  }
}