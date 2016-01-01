import * as Interfaces from '../interfaces'
import { Tree } from './tree'

export interface ITree {
  id: string
  name: string
  path: string
  children: Array<ITree>
}

export interface ITreeProps extends React.Props<Tree>, Interfaces.IReduxConnected {
  key: string
  tree: Immutable.Map<string, any>
}

export interface ITreeState { }