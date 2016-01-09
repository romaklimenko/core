'use strict'

const React = require('react')

const Content = require('./content')
const Footer = require('./footer')
const Tree = require('./tree/tree')

const Container = (props) => {
  return React.createElement(
        'div',
        { className: 'flex-container' },
        React.createElement(
          'div',
          { className: 'flex-row' },
          React.createElement(
            'aside',
            { className: 'tree' },
            React.createElement(Tree, { key: props.state.getIn(['tree', 'id']),
              dispatch: props.dispatch, state: props.state,
              tree: props.state.get('tree') })
          ),
          React.createElement(Content, { state: props.state })
        ),
        React.createElement(Footer, { database: 'master' }))
}

module.exports = Container
