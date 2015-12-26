'use strict'

import { Content } from './Content'
import { ITree, ITreeProps, ITreeState, Tree } from './Tree/Tree'
import { Footer } from './Footer'
import { IStore } from '../Core'

export interface IContainerProps extends React.Props<Container> {
  dispatch?: {(object: any): any},
  tree?: ITree
}

export interface IContainerState { }

export class Container extends React.Component<IContainerProps, IContainerState> {
  render() {
    const { dispatch, tree } = this.props

    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={tree.name}
            onToggleCollapsed={ () => {
              dispatch({ type: 'TREE_COLLAPSED_TOGGLE' })
            }}
            {...{ tree: tree }} />
        </aside>
        <Content />
      </div>
      <Footer database="master" />
    </div>
  }
}