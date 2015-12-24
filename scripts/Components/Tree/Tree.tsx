'use strict';

import * as React from 'react';

export interface ITree {
  name: string;
  children: Array<ITree>;
}

export interface ITreeProps {
  key: string;
  tree: ITree;
}

export interface ITreeState {
}

const TREE_ARROW_COLLAPSED = <svg width="16" height="16" className="tree-arrow-collapsed">
                              <path fill="#646465" d="M6 4v8l4-4-4-4zm1 2.414l1.586 1.586-1.586 1.586v-3.172z" />
                             </svg>;

const TREE_ARROW_EXPANDED = <svg width="16" height="16" className="tree-arrow-expanded">
                              <path fill="#646465" d="M11 10.07h-5.656l5.656-5.656v5.656z" />
                            </svg>;

export class Tree extends React.Component<ITreeProps, ITreeState> {
  render() {
    const tree = this.props.tree;

    if (!tree) {
      throw Error("The tree is not defined.");
    }

    if (!tree.children) {
      tree.children = [];
    };

    let arrow;

    if (tree.children.length === 0) {
      arrow = TREE_ARROW_COLLAPSED;
    }
    else {
      arrow = TREE_ARROW_EXPANDED;
    }

    return  <ul>
              {arrow}
              <span>{tree.name}</span>
              <ul>
                {tree.children.map((child: ITree) => {
                  return <Tree key={child.name} {...{tree: child}} />;
                })}
              </ul>
            </ul>;
  }
}