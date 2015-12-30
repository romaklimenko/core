'use strict'

import * as Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Container } from './components/container'
import {
  ITree,
  TREE_FETCH_REQUEST, TREE_FETCH_RESPONSE, TREE_FETCH_FAILURE,
  TREE_TOGGLE_COLLAPSED } from './components/tree/tree'
import { IItem, IRepository } from 'interfaces'
import { FakeRepository } from './repositories/fake-repository/fake-repository'

export interface IStore {
  tree: ITree
}

const repository: IRepository = new FakeRepository

const initialState: Immutable.Map<string, any> = Immutable.fromJS({
  tree: {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'sitecore',
    path: '11111111-1111-1111-1111-111111111111',
    children: [] } })

window['state'] = initialState

// TREE_TOGGLE_COLLAPSED
const treeToggleCollapsed = (path: string) => {
  return {
    type: TREE_TOGGLE_COLLAPSED,
    path
  }
}

// TREE_FETCH_REQUEST
const treeFetchRequest = (id: string) => {
  return dispatch => {
    return repository.getChildren(id)
      .then((children: IItem[]) => {
        store.dispatch(treeFetchResponse(children))
      })
      .catch((reason: any) => {
        store.dispatch(treeFetchFailure(reason))
      })
  }
}

// TREE_FETCH_RESPONSE
const treeFetchResponse = (children: IItem[]) => {
  return {
    type: TREE_FETCH_RESPONSE,
    children
  }
}

// TREE_FETCH_FAILURE
const treeFetchFailure = (reason: any) => {
  return {
    type: TREE_FETCH_FAILURE,
    reason
  }
}

const reducer = (state: Immutable.Map<string, any>, action: any) => {

  console.info('action', action)

  if (!state) {
    return initialState
  }

  switch (action.type) {
    case TREE_TOGGLE_COLLAPSED:
      const splittedPath = action.path.split('/')
      const tree = state.get('tree').toJS()

      const pathReducer = (tree: ITree, id: string, index: number, array: string[]) => {
        const child: ITree = tree.children.filter((x: ITree) => x.id === id)[0]
        return child
      }

      const child = splittedPath.reduce(pathReducer, { children: [tree] })

      if (child.path === action.path) child.children = []

      return state.set('tree', Immutable.fromJS(tree))

    case TREE_FETCH_REQUEST:
      console.warn('TODO: change root to loading.')
      treeFetchRequest(action.id)
      return state

    case TREE_FETCH_RESPONSE:
      console.warn('TODO: attach response to the tree, change root to loaded.')
      return state

    case TREE_FETCH_FAILURE:
      console.error(action.reason)
      return state

    default:
      return state
  }
}

const createStoreWithMiddleware = applyMiddleware(thunk) (createStore)
const store = createStoreWithMiddleware(reducer)

store.subscribe(() => {
  console.info('state', store.getState())
  render(store)
})

const containerNode: HTMLElement = document.getElementById('container')

const render = (store) => {
  const ReduxContainer = connect((state) => {
    return {
      tree: state.get('tree')
    }
  })(Container)

  ReactDOM.render(<Provider store={store}><ReduxContainer /></Provider>, containerNode)
}

render(store)

store.dispatch(treeFetchRequest('11111111-1111-1111-1111-111111111111'))