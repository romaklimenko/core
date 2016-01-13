'use strict'

const test = require('tape')

const Immutable = require('immutable')

const InitialState = require('../../../initial-state')
const TreeConstants = require('../tree-constants')
const TreeReducers = require('../tree-reducers')

test('@@redux/INIT', (assert) => {
  const state = Immutable.fromJS({a: 'a', b: { c: 'c' }})
  const action = { type: '@@redux/INIT' }
  const newState = TreeReducers.TreeReducer(state, action)
  assert.equal(state, newState)
  assert.end()
})

test('TreeReducer returns InitialState if passed state is undefined.', (assert) => {
  const action = { type: '@@redux/INIT' }
  const state = TreeReducers.TreeReducer(undefined, action)
  assert.equal(state, InitialState)
  assert.end()
})

test('TreeReducer.TREE_COLLAPSE', (assert) => {
  const action = { type: TreeConstants.TREE_COLLAPSE, path: '11111111-1111-1111-1111-111111111111/A' }

  const state = InitialState
    .setIn(
      ['tree', '11111111-1111-1111-1111-111111111111/A'],
      Immutable.fromJS({ path: '11111111-1111-1111-1111-111111111111/A' }))
    .setIn(
      ['tree', '11111111-1111-1111-1111-111111111111/A/AA'],
      Immutable.fromJS({ path: '11111111-1111-1111-1111-111111111111/A/AA' }))
    .setIn(
      ['tree', '11111111-1111-1111-1111-111111111111/A/AA/AAA'],
      Immutable.fromJS({ path: '11111111-1111-1111-1111-111111111111/A/AA/AAA' }))
    .setIn(
      ['tree', '11111111-1111-1111-1111-111111111111/A/AB'],
      Immutable.fromJS({ path: '11111111-1111-1111-1111-111111111111/A/AB' }))

  assert.equal(state.get('tree').count(), 5)

  const newState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.get('tree').count(), 2)

  assert.end()
})

test('TreeReducer.TREE_EXPAND', (assert) => {
  const action = { type: TreeConstants.TREE_EXPAND, path: '11111111-1111-1111-1111-111111111111' }

  const state = InitialState

  const newState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.getIn(['tree', action.path, 'loading']), true)
  assert.end()
})

test('TreeReducer.TREE_FETCH_RESPONSE', (assert) => {
  const action = {
    type: TreeConstants.TREE_FETCH_RESPONSE,
    path: '11111111-1111-1111-1111-111111111111',
    children: [
      { Path: '11111111-1111-1111-1111-111111111111/A/AA' },
      { Path: '11111111-1111-1111-1111-111111111111/A/AB' },
      { Path: '11111111-1111-1111-1111-111111111111/A/AC' }
    ]
  }

  const state = InitialState.setIn(['tree', '11111111-1111-1111-1111-111111111111', 'loading'], true)
  assert.equal(state.get('tree').count(), 1)
  assert.equal(state.getIn(['tree', action.path, 'loading']), true)

  const newState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.getIn(['tree', action.path, 'loading']), false)
  assert.equal(newState.get('tree').count(), 4)
  assert.end()
})