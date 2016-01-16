'use strict'

const React = require('react')
const ReactDOM = require('react-dom')
const ReactRedux = require('react-redux')
const Redux = require('redux')
const Thunk = require('redux-thunk')

const Container = require('./components/container')
const Logger = require('./middleware/logger')
const TreeActions = require('./components/tree/tree-actions')
const TreeReducers = require('./components/tree/tree-reducers')

let createStore = Redux.applyMiddleware(Logger) (Redux.createStore)
    createStore = Redux.applyMiddleware(Thunk)  (createStore)
const store = createStore(TreeReducers.TreeReducer)

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
  render(store)
})

render(store)
store.dispatch(TreeActions.expand(store.getState().get('tree').first().get('path')))
store.dispatch(TreeActions.select(store.getState().get('tree').first().get('path')))
