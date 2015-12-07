/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface ITree {
  name: string;
  children: Array<ITree>;
}

interface ITreeProps {
  key: string;
  tree: ITree;
}

interface ITreeState {
}

class Tree extends React.Component<ITreeProps, ITreeState> {
  public render() {
    var tree = this.props.tree;

    if (!tree) {
      throw Error("Tree is not defined.");
    }

    if (!tree.children) {
      tree.children = [];
    };

    return <ul>
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