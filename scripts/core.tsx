import * as Immutable from 'immutable'
import { applyMiddleware, createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { Container } from './components/container'
import * as TreeActions from './components/tree/tree-actions'
import * as TreeReducers from './components/tree/tree-reducers'
import { InitialState } from './initial-state'

const createStoreWithMiddleware = applyMiddleware(thunk) (createStore)
const store = createStoreWithMiddleware(TreeReducers.TreeReducer)

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