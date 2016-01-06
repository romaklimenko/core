'use strict'

import * as Interfaces from '../../interfaces'
import * as TreeInterfaces from './tree-interfaces'

const Immutable = require('immutable')
const TreeActions = require('./tree-actions')

export interface ITreeProps extends React.Props<TreeInterfaces.ITree>, Interfaces.IReduxConnected {
  key: string
  tree: Immutable.Map<string, any>
}

export interface ITreeState { }

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

class Tree extends React.Component<ITreeProps, ITreeState> {

  toggle(e) {
    e.stopPropagation()
    if (getChildren(this.props.tree).size !== 0) {
      this.props.dispatch(TreeActions.collapse(this.props.tree))
    }
    else {
      this.props.dispatch(TreeActions.expand(this.props.tree))
    }
  }

  select(e) {
    e.stopPropagation()
    this.props.dispatch(TreeActions.select(this.props.tree))
  }

  render() {
    const tree: Immutable.Map<string, any> = this.props.tree
    const currentTreeNode: Immutable.Map<string, any> = this.props.state.get('currentTreeNode')

    const className = currentTreeNode && currentTreeNode.get('id') === tree.get('id') ?
      'tree-selected' : undefined

    return  <ul>
              <div onClick={e => this.select(e) } className={className}>
                <img onClick={e => this.toggle(e)} src={getArrow(tree)} />
                <span>{tree.get('name')}</span>
              </div>
              <ul>
                {tree.get('children').map((child: Immutable.Map<string, any>) => {
                  return <Tree key={child.get('id')}
                    dispatch={this.props.dispatch} state={this.props.state} tree={child} />
                })}
              </ul>
            </ul>
  }
}

module.exports = Tree