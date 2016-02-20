'use strict'

const Logger = store => next => action => {
    console.info('action', action)
    const result = next(action)
    console.info('state', store.getState())
    return result
}

module.exports = Logger