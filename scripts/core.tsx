'use strict'

import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import { Container } from './components/container'
import { ITree } from './components/tree/tree'

const tree: ITree = {
  name: "sitecore",
  childTrees: [
    { name: "Content",
      childTrees: [
        { name: "Home", childTrees: [] },
        { name: "Layout", childTrees: [
          { name: "Controllers", childTrees: [] },
          { name: "Devices", childTrees: [] },
          { name: "Layouts", childTrees: [] },
          { name: "Models", childTrees: [] },
          { name: "Placeholder Settings", childTrees: [] },
          { name: "Renderings", childTrees: [] },
          { name: "Sublayouts", childTrees: [] },
          { name: "Simulators", childTrees: [] }]
        },
        { name: "Media Library", childTrees: [] },
        { name: "Social", childTrees: [] },
        { name: "System", childTrees: [
          { name: "Aliases", childTrees: [] },
          { name: "App Center Sync", childTrees: [] },
          { name: "Dictionary", childTrees: [] },
          { name: "Languages", childTrees: [] },
          { name: "List Manager", childTrees: [] },
          { name: "Marketing Control Center", childTrees: [] },
          { name: "Modules", childTrees: [] },
          { name: "Proxies", childTrees: [] },
          { name: "Publishing Targets", childTrees: [] },
          { name: "Settings", childTrees: [] },
          { name: "Social", childTrees: [] },
          { name: "Tasks", childTrees: [] }]
        }]}]}

export interface IStore {
  tree: ITree
  count: number
}

const initialState: IStore = {
  tree: tree,
  count: 1
}

const reducer = (state: IStore, action: any) => {
  if (!state) {
    return initialState
  }

  switch (action.type) {
    case 'TREE_COLLAPSED_TOGGLE': 
      state.tree.name = state.tree.name + ' 1' // TODO: Mutable!
      return state
    default:
      return state
  }
}

const store = createStore(reducer)

store.subscribe(() => {
  console.log(store.getState())
  render(store)
})

const select = (state) => {
  return {
    count: state.count,
    tree: state.tree
  }
}

const containerNode: any = document.getElementById('container')

const render = (store) => {
  const ContainerDecorator = connect(select)(Container)
  ReactDOM.render(<Provider store={store}><ContainerDecorator /></Provider>, containerNode)
}

render(store)