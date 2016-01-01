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
  dispatch?: {(object: any): any}
}

export interface IStore {
  tree: TreeInterfaces.ITree
}