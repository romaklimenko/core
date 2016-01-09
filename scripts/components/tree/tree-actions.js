'use strict'

const FakeRepository = require('../../repositories/fake-repository/fake-repository')
const TreeConstants = require('./tree-constants')

const repository = new FakeRepository

const collapse = (tree) => {
  return {
    type: TreeConstants.TREE_COLLAPSE,
    tree
  }
}

const expand = (tree) => {
  return dispatch => {
    dispatch({ type: TreeConstants.TREE_EXPAND, tree })
    return repository.getChildren(tree.get('id'))
      .then((children) => {
        dispatch(fetchResponse(tree, children))
      })
      .catch((reason) => {
        dispatch(fetchFailure(reason))
      })
  }
}

const fetchFailure = (reason) => {
  return {
    type: TreeConstants.TREE_FETCH_FAILURE,
    reason
  }
}

const fetchResponse = (tree, children) => {
  return {
    type: TreeConstants.TREE_FETCH_RESPONSE,
    tree,
    children
  }
}

const select = (tree) => {
  return {
    type: TreeConstants.TREE_SELECT,
    tree
  }
}

module.exports = {
  collapse,
  expand,
  fetchFailure,
  fetchResponse,
  select
}