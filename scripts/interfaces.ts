import * as TreeInterfaces from './components/tree/tree-interfaces'

export interface IItem {
  ID: string
  Name: string
  Parent: string
}

export interface IRepository {
  getChildren(id: string): Promise<IItem[]>
}

export interface IReduxConnected {
  currentId?: string
  dispatch?: {(object: any): any}
}