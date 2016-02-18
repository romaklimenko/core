import { IAction, IItem, IReduxProps } from '../../interfaces'

export interface ITreeCollapseAction extends IAction {
  path: string
}

export interface ITreeExpandAction extends IAction {
  path: string
}

export interface ITreeFetchChildrenAction extends IAction {
  children: IItem[]
  path: string
}

export interface ITreeFetchChildrenFailureAction extends IAction {
  reason: string
}

export interface ITreeFetchItemFailureAction extends IAction {
  reason: string
}

export interface ITreeFetchItemResponseAction extends IAction {
  item: IItem
  path: string
}

export interface ITreeSelectAction extends IAction {
  path: string
}

export interface ITreeProps extends IReduxProps {
  path: string
}