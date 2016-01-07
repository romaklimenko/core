'use strict'
{
  const test = require('tape')

  const Immutable = require('immutable')  
  const InitialState = require('../../../initial-state')
  const TreeReducer = require('../tree-reducers')

  test('TreeReducer does not process @@redux/INIT.', (assert) => {
    const state = Immutable.fromJS({a: 'a', b: { c: 'c' }})
    const action = { type: '@@redux/INIT' }
    const newState = TreeReducer(state, action)
    assert.equal(state, newState)
    assert.end()
  })

  test('TreeReducer returns InitialState if passed state is undefined.', (assert) => {
    const action = { type: '@@redux/INIT' }
    const state = TreeReducer(undefined, action)
    assert.equal(state, InitialState)
    assert.end()
  })
}