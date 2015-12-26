'use strict'

import * as React from 'react'
import * as Immutable from 'immutable'
import { IReduxConnected } from '../interfaces'

export interface ITree {
  id: string
  name: string
  path: string
  children: Array<ITree>
}

export interface ITreeProps extends React.Props<Tree>, IReduxConnected {
  key: string
  tree: Immutable.Map<string, any>
}

export interface ITreeState { }

const TREE_ARROW_COLLAPSED = <svg width="16" height="16" className="tree-arrow-collapsed">
                              <path fill="#646465" d="M6 4v8l4-4-4-4zm1 2.414l1.586 1.586-1.586 1.586v-3.172z" />
                             </svg>

const TREE_ARROW_EXPANDED = <svg width="16" height="16" className="tree-arrow-expanded">
                              <path fill="#646465" d="M11 10.07h-5.656l5.656-5.656v5.656z" />
                            </svg>

export class Tree extends React.Component<ITreeProps, ITreeState> {

  toggleCollapsed(e) {
    this.props.dispatch({
      type: 'TREE_TOGGLE_COLLAPSED',
      path: this.props.tree.get('path') })
  }

  render() {
    const tree: Immutable.Map<string, any> = this.props.tree

    let arrow

    if (tree.get('children').size === 0) {
      arrow = TREE_ARROW_COLLAPSED
    }
    else {
      arrow = TREE_ARROW_EXPANDED
    }

    return  <ul>
              <span onClick={e => this.toggleCollapsed(e)}>{arrow}</span>
              <span>{tree.get('name')}</span>
              <ul>
                {tree.get('children').map((childTree: Immutable.Map<string, any>) => {
                  return <Tree key={childTree.get('path')}
                    dispatch={this.props.dispatch} {...{tree: childTree}} />;
                })}
              </ul>
            </ul>
  }
}