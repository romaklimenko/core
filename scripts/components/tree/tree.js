'use strict'

const Immutable = require('immutable')
const React = require('react')

const TreeActions = require('./tree-actions')

const getChildren = (tree) => {
  return tree.get('children')
}

const getArrow = (tree) => {
  if (tree.get('loading')) {
    return 'img/loading.svg'
  }

  if (tree.get('children').size === 0) {
    return 'img/arrow-collapse.svg'
  }
  else {
    return 'img/arrow-expand.svg'
  }
}

class Tree extends React.Component {
  toggle(e) {
    e.stopPropagation()
    if (this.props.tree.get('children').size !== 0) {
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
    const currentTreeNode = this.props.state.get('currentTreeNode')

    const className = currentTreeNode && currentTreeNode.get('id') === this.props.tree.get('id') ?
      'tree-selected' : undefined

    return React.createElement(
            'ul',
            null,
            React.createElement(
              'div',
              { onClick: (e) => { return this.select(e) }, className: className },
              React.createElement('img', { onClick: (e) => { return this.toggle(e) }, src: getArrow(this.props.tree) }),
              React.createElement(
                'span',
                null,
                this.props.tree.get('name')
              )
            ),
            React.createElement(
              'ul',
              null,
              this.props.tree.get('children').map((child) => {
                return React.createElement(Tree, { key: child.get('id'),
                  dispatch: this.props.dispatch, state: this.props.state, tree: child })
              })
            )
          )
  }
}

module.exports = Tree
