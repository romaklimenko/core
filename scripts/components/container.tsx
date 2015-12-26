'use strict'

import { Content } from './content'
import { ITree, ITreeProps, ITreeState, Tree } from './tree/tree'
import { Footer } from './footer'
import { IStore } from '../core'

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