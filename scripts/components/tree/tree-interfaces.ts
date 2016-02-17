import { IAction, IItem } from '../../interfaces'

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

export interface ITreeFetchItemResponseAction extends IAction {
  item: IItem
  path: string
}

export interface ITreeSelectAction extends IAction {
  path: string
}