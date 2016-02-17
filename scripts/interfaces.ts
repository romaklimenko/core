import * as Immutable from 'immutable'

export interface IAction {
  type: string
}

export interface IItem {
  ID?: string
  DisplayName?: string
  HasChildren?: boolean
  LongID?: string
}

export interface IState extends Immutable.Map<string, any> { }