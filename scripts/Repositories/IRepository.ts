'use strict';

import { IItem } from 'IItem';

export interface IRepository {
  getChildren(id: string): Promise<IItem[]>;
}