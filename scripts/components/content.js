'use strict'

const React = require('react')

class Content extends React.Component {
  render() {
    const currentTreeNode = this.props.state.get('currentTreeNode')
    const currentTreeNodeJson = currentTreeNode ?
      JSON.stringify(currentTreeNode.toJS(), null, '\t') : ''

    return React.createElement(
      'div',
      { className: 'content' },
      React.createElement(
        'pre',
        { style: { overflow: 'hidden', margin: '25px', maxWidth: '800px' } },
        currentTreeNodeJson
      )
    )
  }
}

module.exports = Content
