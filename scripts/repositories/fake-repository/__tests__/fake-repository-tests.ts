'use strict'

jest.dontMock('object-assign')
jest.dontMock('../fake-repository')

// TypeScript in current mode doesn't like require
import { FakeRepository } from '../fake-repository'

// Jest doesn't like ES2015 import
const _FakeRepository = require('../fake-repository').FakeRepository

import { IItem, IRepository } from '../../interfaces'

const fakeRepository: IRepository = new _FakeRepository()

describe('FakeRepository', () => {
  describe('getChildren', () => {
    pit('gets children', () => {
      return fakeRepository
        .getChildren('11111111-1111-1111-1111-111111111111')
        .then((items: IItem[]) => {
          expect(items.length).toBe(6)
          expect(items.map((item: IItem) => {
            return item.ID
          })).toContain('EB2E4FFD-2761-4653-B052-26A64D385227')
        })
    })
  })
})