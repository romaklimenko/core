'use strict'

const applyMiddleware = require('redux').applyMiddleware
const createStore = require('redux').createStore

const connect = require('react-redux').connect
const Provider = require('react-redux').Provider

const Thunk = require('redux-thunk')

const Container = require('./components/container')
const TreeActions = require('./components/tree/tree-actions')
const TreeReducers = require('./components/tree/tree-reducers')

const createStoreWithMiddleware = applyMiddleware(Thunk) (createStore)
const store = createStoreWithMiddleware(TreeReducers)

store.subscribe(() => {
  console.info('state', store.getState())
  render(store)
})

const containerNode: HTMLElement = document.getElementById('container')

const render = (store) => {
  const ReduxContainer = connect((state) => { return { state: state } })(Container)
  ReactDOM.render(<Provider store={store}><ReduxContainer /></Provider>, containerNode)
}

render(store)

store.dispatch(TreeActions.expand(store.getState().get('tree')))
store.dispatch(TreeActions.select(store.getState().get('tree')))