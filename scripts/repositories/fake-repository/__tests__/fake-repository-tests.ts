jest.dontMock('object-assign')
jest.dontMock('../fake-repository')

// TypeScript in current mode doesn't like require
import { FakeRepository } from '../fake-repository'

// Jest doesn't like ES2015 import
const _FakeRepository = require('../fake-repository').FakeRepository

import * as Interfaces from '../../interfaces'

const fakeRepository: Interfaces.IRepository = new _FakeRepository()

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