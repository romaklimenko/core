import * as Immutable from 'immutable'
import { Content } from './content'
import { Tree } from './tree/tree'
import { Footer } from './footer'
import * as Interfaces from '../interfaces'

export interface IContainerProps extends React.Props<Container>, Interfaces.IReduxConnected {}
export interface IContainerState {}

export class Container extends React.Component<IContainerProps, IContainerState> {
  render() {
    const { dispatch, state } = this.props
    const tree: Immutable.Map<string, any> = state.get('tree')
    const key: string = tree.get('id')

    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={key} dispatch={dispatch} state={state} tree={tree} />
        </aside>
        <Content />
      </div>
      <Footer database="master" />
    </div>
  }
}