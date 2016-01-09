'use strict'

const Immutable = require('immutable')
const React = require('react')

const TreeActions = require('./tree-actions')

const Tree = (props) => {
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

  const toggle = (e) => {
    e.stopPropagation()
    if (props.tree.get('children').size !== 0) {
      props.dispatch(TreeActions.collapse(props.tree))
    }
    else {
      props.dispatch(TreeActions.expand(props.tree))
    }
  }

  const select = (e) => {
    e.stopPropagation()
    props.dispatch(TreeActions.select(props.tree))
  }

  const currentTreeNode = props.state.get('currentTreeNode')

  const className = currentTreeNode && currentTreeNode.get('id') === props.tree.get('id') ?
    'tree-selected' : undefined

  return React.createElement(
          'ul',
          null,
          React.createElement(
            'div',
            { onClick: (e) => { return select(e) }, className: className },
            React.createElement('img', { onClick: (e) => {
              return toggle(e) }, src: getArrow(props.tree)
            }),
            React.createElement(
              'span',
              null,
              props.tree.get('name')
            )
          ),
          React.createElement(
            'ul',
            null,
            props.tree.get('children').map((child) => {
              return React.createElement(Tree, { key: child.get('id'),
                dispatch: props.dispatch, state: props.state, tree: child })
            })
          )
        ) }

module.exports = Tree
