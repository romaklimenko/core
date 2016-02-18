import { IItem } from '../../interfaces'
import * as TreeInterfaces from './tree-interfaces'

import Repository from '../../repositories/sitecore-repository'
import * as TreeConstants from './tree-constants'
import * as TreeUtils from './tree-utils'

export const collapse = (path: string): TreeInterfaces.ITreeCollapseAction => {
  return { type: TreeConstants.TREE_COLLAPSE, path }
}

export const fetchChildrenFailure = (reason: string): TreeInterfaces.ITreeFetchChildrenFailureAction => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_FAILURE, reason }
}

export const fetchChildrenResponse = (path: string, children: IItem[]): TreeInterfaces.ITreeFetchChildrenAction => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_RESPONSE, path, children }
}

export const fetchItemFailure = (reason: string): TreeInterfaces.ITreeFetchItemFailureAction => {
  return { type: TreeConstants.TREE_FETCH_ITEM_FAILURE, reason }
}

export const fetchItemResponse = (path: string, item: IItem): TreeInterfaces.ITreeFetchItemResponseAction => {
  return { type: TreeConstants.TREE_FETCH_ITEM_RESPONSE, path, item }
}

export const expand = (path: string) => {
  return dispatch => {
    dispatch(<TreeInterfaces.ITreeExpandAction>{ type: TreeConstants.TREE_EXPAND, path })
    return Repository.getChildren(TreeUtils.getIdFromPath(path))
      .then( (children: IItem[]) => { dispatch(fetchChildrenResponse(path, children)) })
      .catch((reason)   => { dispatch(fetchChildrenFailure(reason)) })
  }
}

export const select = (path: string) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_SELECT, path })
    return Repository.getItem(TreeUtils.getIdFromPath(path))
      .then( (item: IItem)   => { dispatch(fetchItemResponse(path, item)) })
      .catch((reason) => { dispatch(fetchItemFailure(reason)) })
  }
}