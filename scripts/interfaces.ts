'use strict'

export interface IItem {
  ID: string
  Name: string
  Parent: string
}

export interface IRepository {
  getChildren(id: string): Promise<IItem[]>
}

export interface IReduxConnected {
  dispatch?: {(object: any): any}
}