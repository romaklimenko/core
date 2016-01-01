import * as Immutable from 'immutable'
import { Content } from './content'
import { Tree } from './tree/tree'
import { Footer } from './footer'
import * as Interfaces from '../interfaces'

export interface IContainerProps extends React.Props<Container>, Interfaces.IReduxConnected {
  tree?: Immutable.Map<string, any>
}

export interface IContainerState { }

export class Container extends React.Component<IContainerProps, IContainerState> {
  render() {
    const { dispatch, tree } = this.props

    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={tree.get('name')} dispatch={dispatch} {...{ tree: tree }} />
        </aside>
        <Content />
      </div>
      <Footer database="master" />
    </div>
  }
}