'use strict'

import * as Interfaces from '../interfaces'

export interface ITree {
  id: string
  name: string
  path: string
  children: Array<ITree>
  loading?: boolean
}