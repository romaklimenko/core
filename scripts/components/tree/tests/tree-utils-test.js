'use strict'

const test = require('tape')

const Immutable = require('immutable')

const InitialState = require('../../../initial-state')
const TreeUtils = require('../tree-utils')

const getTestState = () => {
  const array = [
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]/[AAA]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]/[AAB]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]/[ABA]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]/[ABB]' },
    { path: '/{11111111-1111-1111-1111-111111111111}/[A]/[AC]' }]
  return array.reduce((p, c) => {
    return p.setIn(['tree', c.path], Immutable.fromJS(c))
  }, InitialState)
}

const assertTreeNode = (assert, state, path) => {
  assert.equal(state.getIn(['tree', path, 'path']), path)
}

test('getTestState works as expected', (assert) => {
  const state = getTestState()

  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]/[AAA]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]/[AAB]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]/[ABA]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AB]/[ABB]')
  assertTreeNode(assert, state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AC]')

  assert.equal(state.get('tree').count(), 9)

  assert.end()
})

test('TreeUtils.children', (assert) => {
  const state = getTestState()
  assert.equal(TreeUtils.children(state, '/{11111111-1111-1111-1111-111111111111}').count(), 1)
  assert.equal(TreeUtils.children(state, '/{11111111-1111-1111-1111-111111111111}/[A]').count(), 3)
  assert.equal(TreeUtils.children(state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]').count(), 2)
  assert.equal(TreeUtils.children(state, '/{11111111-1111-1111-1111-111111111111}/[A]/[AA]/[AAA]').count(), 0)

  assert.equal(
    TreeUtils.children(
      state,
      '/{11111111-1111-1111-1111-111111111111}').first().get('path'),
    '/{11111111-1111-1111-1111-111111111111}/[A]')

  assert.end()
})

test('TreeUtils.children().map', (assert) => {
  const state = getTestState()

  const children = TreeUtils.children(state, '/{11111111-1111-1111-1111-111111111111}/[A]')
  children.map(v => {
    assert.equal(v.get('path').startsWith('/{11111111-1111-1111-1111-111111111111}/[A]/'), true)
  })

  assert.end()
})

test('TreeUtils.getIdFromPath', (assert) => {
  assert.equal(TreeUtils.getIdFromPath('A'), 'A')
  assert.equal(TreeUtils.getIdFromPath('A/B'), 'B')
  assert.end()
})