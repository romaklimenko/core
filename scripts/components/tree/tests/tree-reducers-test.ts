import { IAction, IState } from '../../../interfaces'
import * as TreeInterfaces from '../tree-interfaces'

import test from 'tape'
import * as Immutable from 'immutable'

import InitialState from '../../../initial-state'

import * as TreeConstants from '../tree-constants'
import * as TreeReducers from '../tree-reducers'

test('@@redux/INIT', (assert) => {
  const state: IState = Immutable.fromJS({a: 'a', b: { c: 'c' }})
  const action: IAction = { type: '@@redux/INIT' }
  const newState: IState = TreeReducers.TreeReducer(state, action)
  assert.equal(state, newState)
  assert.end()
})

test('TreeReducer returns InitialState if passed state is undefined.', (assert) => {
  const action: IAction = { type: '@@redux/INIT' }
  const state: IState = TreeReducers.TreeReducer(undefined, action)
  assert.equal(state, InitialState)
  assert.end()
})

test('TreeReducer.TREE_COLLAPSE', (assert) => {
  const action: TreeInterfaces.ITreeCollapseAction = {
    type: TreeConstants.TREE_COLLAPSE,
    path: '/{11111111-1111-1111-1111-111111111111}/A'
  }

  const state: IState = InitialState
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AA'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AA' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AA/AAA'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AA/AAA' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AB'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AB' }))

  assert.equal(state.get('tree').count(), 5)

  const newState: IState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.get('tree').count(), 2)

  assert.end()
})

test('TreeReducer.TREE_EXPAND', (assert) => {
  const action: TreeInterfaces.ITreeExpandAction = {
    type: TreeConstants.TREE_EXPAND,
    path: '/{11111111-1111-1111-1111-111111111111}'
  }

  const state: IState = InitialState

  const newState: IState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.getIn(['tree', action.path, 'loading']), true)
  assert.end()
})

test('TreeReducer.TREE_FETCH_CHILDREN_RESPONSE', (assert) => {
  const action: TreeInterfaces.ITreeFetchChildrenAction = {
    type: TreeConstants.TREE_FETCH_CHILDREN_RESPONSE,
    path: '/{11111111-1111-1111-1111-111111111111}',
    children: [
      { LongID: '/{11111111-1111-1111-1111-111111111111}/A/AA' },
      { LongID: '/{11111111-1111-1111-1111-111111111111}/A/AB' },
      { LongID: '/{11111111-1111-1111-1111-111111111111}/A/AC' }
    ]
  }

  const state: IState = InitialState.setIn(
    ['tree', '/{11111111-1111-1111-1111-111111111111}', 'loading'], true)
  assert.equal(state.get('tree').count(), 1)
  assert.equal(state.getIn(['tree', action.path, 'loading']), true)

  const newState: IState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.getIn(['tree', action.path, 'loading']), false)
  assert.equal(newState.get('tree').count(), 4)
  assert.end()
})

test('TreeReducer.TREE_FETCH_ITEM_RESPONSE', (assert) => {
  const action: TreeInterfaces.ITreeFetchItemResponseAction = {
    type: TreeConstants.TREE_FETCH_ITEM_RESPONSE,
    path: '/{11111111-1111-1111-1111-111111111111}',
    item: {
      ID: '{11111111-1111-1111-1111-111111111111}',
      DisplayName: 'new-sitecore',
      LongID: '/{11111111-1111-1111-1111-111111111111}',
      HasChildren: true
    }
  }

  const state: IState = InitialState

  const newState: IState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.getIn(['tree', action.path, 'loading']), false)
  assert.equal(newState.getIn(['tree', action.path, 'id']), action.item.ID)
  assert.equal(newState.getIn(['tree', action.path, 'name']), action.item.DisplayName)
  assert.equal(newState.getIn(['tree', action.path, 'path']), action.item.LongID)
  assert.equal(newState.getIn(['tree', action.path, 'hasChildren']), action.item.HasChildren)
  assert.deepEqual(newState.getIn(['tree', action.path, 'data']).toObject(), action.item)

  assert.end()
})

test('TreeReducer.TREE_SELECT', (assert) => {
  const action: TreeInterfaces.ITreeSelectAction = {
    type: TreeConstants.TREE_SELECT,
    path: '/{11111111-1111-1111-1111-111111111111}/A/AA'
  }

  const state: IState = InitialState
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AA'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AA' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AA/AAA'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AA/AAA' }))
    .setIn(
      ['tree', '/{11111111-1111-1111-1111-111111111111}/A/AB'],
      Immutable.fromJS({ path: '/{11111111-1111-1111-1111-111111111111}/A/AB' }))

  const newState: IState = TreeReducers.TreeReducer(state, action)

  assert.equal(newState.get('currentTreeNode'), action.path)
  assert.equal(newState.getIn(['tree', action.path, 'loading']), true)
  assert.end()
})