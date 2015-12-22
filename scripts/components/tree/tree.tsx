'use strict';

import * as React from "react";

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

export class Tree extends React.Component<ITreeProps, ITreeState> {
  render() {
    const tree = this.props.tree;

    if (!tree) {
      throw Error("The tree is not defined.");
    }

    if (!tree.children) {
      tree.children = [];
    };

    return  <ul>
              <img src="img/arrow-expand.svg" alt="" />
              <span>{tree.name}</span>
              <ul>
                {tree.children.map((child: ITree) => {
                  return <Tree key={child.name} {...{tree: child}} />;
                })}
              </ul>
            </ul>;
  }
}