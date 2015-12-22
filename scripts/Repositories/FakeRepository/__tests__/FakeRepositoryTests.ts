'use strict';

jest.dontMock('fs');
jest.dontMock('object-assign');
jest.dontMock('../FakeRepository');

const fs = require('fs');

// TypeScript in current mode doesn't like require.
import { FakeRepository } from '../FakeRepository';

// Jest doesn't like ES2015 import.
const _FakeRepository = require('../FakeRepository')
  .FakeRepository;

import { IRepository } from '../../IRepository';
import { IItem } from '../../IItem';

const data: IItem[] = JSON.parse(fs.readFileSync('items.json', 'utf8'));

const fakeRepository: FakeRepository = new _FakeRepository();
fakeRepository.data = data;

describe('FakeRepository', () => {
  describe('getChildren', () => {
    pit('gets children', () => {
      return fakeRepository
        .getChildren('11111111-1111-1111-1111-111111111111')
        .then((items: IItem[]) => {
          expect(items.length).toBe(6);
          expect(items.map((item: IItem) => {
            return item.ID;
          })).toContain('EB2E4FFD-2761-4653-B052-26A64D385227');
        });
    });
  });
});