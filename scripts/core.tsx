'use strict'

import * as Immutable from 'immutable'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { Container } from './components/container'
import { ITree } from './components/tree/tree'

export interface IStore {
  tree: ITree
}

const initialState: Immutable.Map<string, any> = Immutable.fromJS({
  tree: {
    id: "[A]",
    name: "[A]",
    path: "[A]",
    children: [
      { id: "[AA]", name: "[AA]", path: "[A]/[AA]",
        children: [
          { id: "[AAA]", name: "[AAA]", path: "[A]/[AA]/[AAA]", children: [] },
          { id: "[AAB]", name: "[AAB]", path: "[A]/[AA]/[AAB]", children: [] }] },
      { id: "[AB]", name: "[AB]", path: "[A]/[AB]",
        children: [
          { id: "[ABA]", name: "[ABA]", path: "[A]/[AB]/[ABA]", children: [] },
          { id: "[ABB]", name: "[ABB]", path: "[A]/[AA]/[ABB]", children: [] }] }] } })

const reducer = (state: Immutable.Map<string, any>, action: any) => {

  console.info('action', action)

  if (!state) {
    return initialState
  }

  switch (action.type) {
    case 'TREE_TOGGLE_COLLAPSED':
      return state.setIn(["tree", "name"], action.path)
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.info('state', store.getState())
  render(store)
})

const select = (state) => {
  return {
    tree: state.get("tree")
  }
}

const containerNode: HTMLElement = document.getElementById('container')

const render = (store) => {
  const ReduxContainer = connect(select)(Container)
  ReactDOM.render(<Provider store={store}><ReduxContainer /></Provider>, containerNode)
}

render(store)