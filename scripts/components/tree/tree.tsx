import * as React from 'react'
import * as Immutable from 'immutable'

import * as TreeActions from './tree-actions'
import * as TreeConstants from './tree-constants'
import * as TreeInterfaces from './tree-interfaces'

const TREE_ARROW_COLLAPSED = <svg width="16" height="16" className="tree-arrow-collapsed">
  <path fill="#646465" d="M6 4v8l4-4-4-4zm1 2.414l1.586 1.586-1.586 1.586v-3.172z" />
</svg>

const TREE_ARROW_EXPANDED =  <svg width="16" height="16" className="tree-arrow-expanded">
  <path fill="#646465" d="M11 10.07h-5.656l5.656-5.656v5.656z" />
</svg>

export class Tree extends React.Component<TreeInterfaces.ITreeProps, TreeInterfaces.ITreeState> {

  getArrow(children: Immutable.List<Immutable.Map<string, any>>) {
    if (children.size === 0) {
      return TREE_ARROW_COLLAPSED
    }
    else {
      return TREE_ARROW_EXPANDED
    }
  }

  onToggleCollapsed(e) {
    this.props.dispatch(TreeActions.toggleCollapsed(this.props.tree.get('path')))
  }

  render() {
    const tree: Immutable.Map<string, any> = this.props.tree

    return  <ul>
              <span onClick={e => this.onToggleCollapsed(e)}>
                {this.getArrow(tree.get('children'))}
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