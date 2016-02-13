'use strict'
{
  const React = require('react')
  const ReactDOM = require('react-dom')
  const ReactRedux = require('react-redux')
  const Redux = require('redux')
  const Thunk = require('redux-thunk')

  const Container = require('./components/container')
  const Logger = require('./middleware/logger')
  const TreeActions = require('./components/tree/tree-actions')
  const TreeReducers = require('./components/tree/tree-reducers')

  const perf = require('./tools/perf')

  const createStore = Redux.compose(
    Redux.applyMiddleware(Logger),
    Redux.applyMiddleware(Thunk),
    window["devToolsExtension"] ? window["devToolsExtension"]() : f => f
  )(Redux.createStore)

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
    perf(() => render(store), 'render')
  })

  perf(() => render(store), 'initial render')
  store.dispatch(TreeActions.expand(store.getState().get('tree').first().get('path')))
  store.dispatch(TreeActions.select(store.getState().get('tree').first().get('path')))
}