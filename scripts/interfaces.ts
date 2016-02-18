import * as Immutable from 'immutable'
import * as Redux from 'redux'

export interface IAction {
  type: string
}

export interface IItem {
  ID?: string
  DisplayName?: string
  HasChildren?: boolean
  LongID?: string
}

export interface IReduxProps {
  dispatch: Redux.Dispatch
  state: IState
}

export interface IRepository {
  getChildren(itemId: string): Promise<IItem[]>
  getItem(itemId: string): Promise<IItem[]>
}

export interface IState extends Immutable.Map<string, any> { }