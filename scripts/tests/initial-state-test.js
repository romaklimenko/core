'use strict'

const test = require('tape')

const Immutable = require('immutable')

const InitialState = require('../initial-state')

test('InitialState behaves as expected', (assert) => {
  assert.equal(InitialState.get('tree').count(), 1)

  const state = InitialState.setIn(['tree', '[A]'], Immutable.fromJS({ path: '[A]' }))

  assert.equal(
    state.getIn(['tree', '/{11111111-1111-1111-1111-111111111111}', 'path']),
    '/{11111111-1111-1111-1111-111111111111}')
  assert.equal(state.getIn(['tree', '[A]', 'path']), '[A]')

  assert.equal(InitialState.get('tree').count(), 1)
  assert.equal(state.get('tree').count(), 2)

  assert.end()
})