'use strict'

import * as Interfaces from '../../interfaces'

jest.dontMock('object-assign')
jest.dontMock('../fake-repository')

const FakeRepository = require('../fake-repository')

const fakeRepository: Interfaces.IRepository = new FakeRepository

describe('FakeRepository', () => {
  describe('getChildren', () => {
    pit('gets children', () => {
      return fakeRepository
        .getChildren('11111111-1111-1111-1111-111111111111')
        .then((items: Interfaces.IItem[]) => {
          expect(items.length).toBe(3)
          expect(items.map((item: Interfaces.IItem) => item.ID))
            .toContain('D37E0440-68D0-4CFB-8F26-AC2FC3127307')
        })
    })
  })
})