'use strict'

let test = require('tape')

const Immutable = require('immutable')

const SitecoreRepository = require('../sitecore-repository')

if (process.env.TRAVIS) {
  test = (name) => {
    console.warn('"' + name
      + '" is disabled as there is no Sitecore instance available on Travis CI.')
  }
}

test('SitecoreRepository.getChildren', (assert) => {
  const templatesItemId = '{3C1715FE-6A13-4FCF-845F-DE308BA9741D}'
  const promise = SitecoreRepository.getChildren(templatesItemId)
    .then(children => {
      assert.equal(children.length, 7)
      assert.end() })
    .catch(reason => {
      assert.fail(reason)
      assert.end() })
})