import * as React from 'react'
import * as Immutable from 'immutable'
import * as TreeActions from './tree-actions'
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
    const currentTreeNode: Immutable.Map<string, any> = this.props.currentTreeNode

    const className = currentTreeNode && currentTreeNode.get('id') === tree.get('id') ?
      'tree-selected' : ''

    return  <ul>
              <div onClick={e => this.select(e) } className={className}>
                <img onClick={e => this.toggle(e)} src={getArrow(tree)} />
                <span>{tree.get('name')}</span>
              </div>
              <ul>
                {tree.get('children').map((childTree: Immutable.Map<string, any>) => {
                  return <Tree key={childTree.get('id')}
                    dispatch={this.props.dispatch} currentTreeNode={this.props.currentTreeNode}
                    {...{tree: childTree}} />;
                })}
              </ul>
            </ul>
  }
}