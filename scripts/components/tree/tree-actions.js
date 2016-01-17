'use strict'

const Repository = require('../../repositories/sitecore-repository')
const TreeConstants = require('./tree-constants')
const TreeUtils = require('./tree-utils')

const collapse = (path) => {
  return { type: TreeConstants.TREE_COLLAPSE, path }
}

const fetchChildrenFailure = (reason) => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_FAILURE, reason }
}

const fetchChildrenResponse = (path, children) => {
  return { type: TreeConstants.TREE_FETCH_CHILDREN_RESPONSE, path, children }
}

const fetchItemFailure = (reason) => {
  return { type: TreeConstants.TREE_FETCH_ITEM_FAILURE, reason }
}

const fetchItemResponse = (path, item) => {
  return { type: TreeConstants.TREE_FETCH_ITEM_RESPONSE, path, item }
}

const expand = (path) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_EXPAND, path })
    return Repository.getChildren(TreeUtils.getIdFromPath(path))
      .then( (children) => { dispatch(fetchChildrenResponse(path, children)) })
      .catch((reason)   => { dispatch(fetchChildrenFailure(reason)) })
  }
}

const select = (path) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_SELECT, path })
    return Repository.getItem(TreeUtils.getIdFromPath(path))
      .then( (item)   => { dispatch(fetchItemResponse(path, item)) })
      .catch((reason) => { dispatch(fetchItemFailure(reason)) })
  }
}

module.exports = {
  collapse,
  expand,
  fetchChildrenFailure,
  fetchChildrenResponse,
  fetchItemFailure,
  fetchItemResponse,
  select
}