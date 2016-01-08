'use strict'

const React = require('react')

const Content = require('./content')
const Footer = require('./footer')
const Tree = require('./tree/tree')

class Container extends React.Component {
  render() {
    return React.createElement(
          'div',
          { className: 'flex-container' },
          React.createElement(
            'div',
            { className: 'flex-row' },
            React.createElement(
              'aside',
              { className: 'tree' },
              React.createElement(Tree, { key: this.props.state.getIn(['tree', 'id']),
                dispatch: this.props.dispatch, state: this.props.state,
                tree: this.props.state.get('tree') })
            ),
            React.createElement(Content, { state: this.props.state })
          ),
          React.createElement(Footer, { database: 'master' }))
  }
}

module.exports = Container
