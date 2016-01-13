'use strict'

const Repository = require('../../repositories/fake-repository/fake-repository')
const TreeConstants = require('./tree-constants')
const TreeUtils = require('./tree-utils')

const collapse = (path) => {
  return { type: TreeConstants.TREE_COLLAPSE, path }
}

const fetchFailure = (reason) => {
  return { type: TreeConstants.TREE_FETCH_FAILURE, reason }
}

const fetchResponse = (path, children) => {
  return { type: TreeConstants.TREE_FETCH_RESPONSE, path, children }
}

const expand = (path) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_EXPAND, path })
    return Repository.getChildren(TreeUtils.getIdFromPath(path))
      .then( (children) => { dispatch(fetchResponse(path, children)) })
      .catch((reason)   => { dispatch(fetchFailure(reason)) })
  }
}

const select = (path) => {
  return { type: TreeConstants.TREE_SELECT, path }
}

module.exports = {
  collapse,
  expand,
  fetchFailure,
  fetchResponse,
  select
}