import * as React from 'react'
import * as Immutable from 'immutable'
import * as TreeActions from './tree-actions'
import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'

const getArrow = (tree: Immutable.Map<string, any>) => {
  if (tree.get('loading')) {
    return 'img/loading.svg'
  }

  if (getChildren(tree).size === 0) {
    return 'img/arrow-collapse.svg'
  }
  else {
    return 'img/arrow-expand.svg'
  }
}

const getChildren = (tree: Immutable.Map<string, any>): Immutable.List<Map<string, any>> => { 
  return tree.get('children')
}

export class Tree extends React.Component<TreeInterfaces.ITreeProps, TreeInterfaces.ITreeState> {

  toggle(e) {
    if (getChildren(this.props.tree).size !== 0) {
      this.props.dispatch(TreeActions.collapse(this.props.tree))
    }
    else {
      this.props.dispatch(TreeActions.expand(this.props.tree))
    }
  }

  render() {
    const tree: Immutable.Map<string, any> = this.props.tree

    return  <ul>
              <span onClick={e => this.toggle(e)}>
                <img src={getArrow(tree)} />
              </span>
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