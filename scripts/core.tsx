import * as React from 'react'
import * as ReactDOM from 'react-dom'
import * as ReactRedux from 'react-redux'
import * as Redux from 'redux'

import Container from './components/container'

// middlewares
import * as thunk from 'redux-thunk' // TODO: use local
import logger from './middleware/logger'
import perf from './tools/perf'

import * as TreeActions from './components/tree/tree-actions'
import * as TreeReducers from './components/tree/tree-reducers'

const createStore = Redux.compose(
  Redux.applyMiddleware(logger),
  Redux.applyMiddleware(thunk),
  window['devToolsExtension'] ? window['devToolsExtension']() : f => f
)(Redux.createStore)

const store = createStore(TreeReducers.TreeReducer)

const containerNode = document.getElementById('container')

const render = (store) => {
  const ReduxContainer = ReactRedux.connect((state) => {
    return { state: state }
  })(Container)

  ReactDOM.render(<ReactRedux.Provider store={store}><ReduxContainer/></ReactRedux.Provider>,
    containerNode)
}

store.subscribe(() => {
  perf(() => render(store), 'render')
})

perf(() => render(store), 'initial render')
store.dispatch(TreeActions.expand(store.getState().get('tree').first().get('path')))
store.dispatch(TreeActions.select(store.getState().get('tree').first().get('path')))