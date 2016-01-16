'use strict'

const request = require('superagent')

const host = 'http://sitecore.api'

const getChildren = (itemId) => {
  return new Promise(
    resolve => {
      request
        .get(host + '/-/item/v1/')
        .query({ scope: 'c', sc_itemid: itemId })
        .end((error, response) => {
          resolve(response.body.result.items)
        })
    }
  )
}

module.exports = {
  getChildren
}
