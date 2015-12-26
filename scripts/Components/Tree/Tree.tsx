'use strict'

import * as React from 'react'

export interface ITree {
  name: string
  childTrees: Array<ITree>
}

export interface ITreeProps extends React.Props<Tree> {
  key: string
  tree: ITree
  onToggleCollapsed?(): void
}

export interface ITreeState { }

const TREE_ARROW_COLLAPSED = <svg width="16" height="16" className="tree-arrow-collapsed">
                              <path fill="#646465" d="M6 4v8l4-4-4-4zm1 2.414l1.586 1.586-1.586 1.586v-3.172z" />
                             </svg>

const TREE_ARROW_EXPANDED = <svg width="16" height="16" className="tree-arrow-expanded">
                              <path fill="#646465" d="M11 10.07h-5.656l5.656-5.656v5.656z" />
                            </svg>

export class Tree extends React.Component<ITreeProps, ITreeState> {

  handleClick(e) {
    this.props.onToggleCollapsed();
  }

  render() {
    const tree = this.props.tree

    if (!tree.childTrees) {
      tree.childTrees = []
    }

    let arrow

    if (tree.childTrees.length === 0) {
      arrow = TREE_ARROW_COLLAPSED
    }
    else {
      arrow = TREE_ARROW_EXPANDED
    }

    return  <ul>
              <span onClick={e => this.handleClick(e)}>{arrow}</span>
              <span>{tree.name}</span>
              <ul>
                {tree.childTrees.map((childTree: ITree) => {
                  return <Tree key={childTree.name}
                    onToggleCollapsed={this.props.onToggleCollapsed}
                    {...{tree: childTree}} />;
                })}
              </ul>
            </ul>
  }
}