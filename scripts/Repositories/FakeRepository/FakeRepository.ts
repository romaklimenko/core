'use strict';

import { IItem } from '../IItem'
import { IRepository } from '../IRepository'

export class FakeRepository implements IRepository {

  data: IItem[];

  getChildren(itemId: string): Promise<IItem[]> {
    return new Promise<IItem[]>(
      resolve => {
        resolve(
          this.data.filter(
            (value: IItem) => {
              return value.Parent === itemId;
            })
        );
      }
    );
  }
}