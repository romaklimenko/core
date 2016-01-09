'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const ReactRedux = require('react-redux')
const Redux = require('redux')
const Thunk = require('redux-thunk')

const Container = require('./components/container')
const TreeActions = require('./components/tree/tree-actions')
const TreeReducers = require('./components/tree/tree-reducers')

const createStoreWithMiddleware = Redux.applyMiddleware(Thunk) (Redux.createStore)
const store = createStoreWithMiddleware(TreeReducers)

const containerNode = document.getElementById('container')

const render = (store) => {
  const ReduxContainer = ReactRedux.connect((state) => {
    return { state: state }
  })(Container)

  ReactDOM.render(React.createElement(
    ReactRedux.Provider,
    { store: store },
    React.createElement(ReduxContainer, null)
  ), containerNode);
}

store.subscribe(() => {
  console.info('state', store.getState())
  render(store)
})

render(store)

store.dispatch(TreeActions.expand(store.getState().get('tree')))
store.dispatch(TreeActions.select(store.getState().get('tree')))
