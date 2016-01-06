'use strict'

import * as Interfaces from '../../interfaces'

const FakeRepository = require('../../repositories/fake-repository/fake-repository')
const TreeConstants = require('./tree-constants')

const repository: Interfaces.IRepository = new FakeRepository

const collapse = (tree: Immutable.Map<string, any>) => {
  return {
    type: TreeConstants.TREE_COLLAPSE,
    tree
  }
}

const expand = (tree: Immutable.Map<string, any>) => {
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

const fetchFailure = (reason: any) => {
  return {
    type: TreeConstants.TREE_FETCH_FAILURE,
    reason
  }
}

const fetchResponse = (tree: Immutable.Map<string, any>, children: Interfaces.IItem[]) => {
  return {
    type: TreeConstants.TREE_FETCH_RESPONSE,
    tree,
    children
  }
}

const select = (tree: Immutable.Map<string, any>) => {
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