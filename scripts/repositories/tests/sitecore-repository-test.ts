import test from 'tape'

import SitecoreRepository from '../sitecore-repository'

const templatesItemId = '{3C1715FE-6A13-4FCF-845F-DE308BA9741D}'

// TODO: do not run on TravisCI

test('SitecoreRepository.getChildren', (assert) => {
  SitecoreRepository.getChildren(templatesItemId)
    .then(children => {
      assert.equal(children.length, 7)
      assert.end() })
    .catch(reason => {
      assert.fail(reason)
      assert.end() })
})

test('SitecoreRepository.getItem', (assert) => {
  SitecoreRepository.getItem(templatesItemId)
    .then(item => {
      assert.equal(item['ID'], templatesItemId) // TODO: need IItem
      assert.end() })
    .catch(reason => {
      assert.fail(reason)
      assert.end() })
})