'use strict'

const Immutable = require('immutable')
const React = require('react')

const TreeActions = require('./tree-actions')
const TreeUtils = require('./tree-utils')

const Tree = (props) => {
  const getArrow = (state, path) => {
    if (props.state.getIn(['tree', path, 'loading'])) {
      return 'img/loading.svg'
    }

    if (TreeUtils.children(state, path).count() === 0) {
      return 'img/arrow-collapse.svg'
    }
    else {
      return 'img/arrow-expand.svg'
    }
  }

  const toggle = (e) => {
    e.stopPropagation()
    if (TreeUtils.children(props.state, props.path).count() > 0) {
      props.dispatch(TreeActions.collapse(props.path))
    }
    else {
      props.dispatch(TreeActions.expand(props.path))
    }
  }

  const select = (e) => {
    e.stopPropagation()
    props.dispatch(TreeActions.select(props.path))
  }

  const className = props.state.get('currentTreeNode') === props.path ?
    'tree-selected' : undefined

  return React.createElement('ul', null,
    React.createElement('div', { onClick: (e) => select(e), className: className },
      React.createElement('img', {
        onClick: (e) => toggle(e),
        src: getArrow(props.state, props.path)
      }),
      React.createElement('span', null, props.state.getIn(['tree', props.path, 'name']))),
    React.createElement('ul', null,
      TreeUtils.children(props.state, props.path).map((child) => {
        return React.createElement(Tree, {
          key: child.get('path'),
          dispatch: props.dispatch,
          path: child.get('path'),
          state: props.state })
      }).toArray()))
}

module.exports = Tree
