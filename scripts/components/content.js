'use strict'

const React = require('react')

const Content = (props) => {
  const currentTreeNode = props.state.get('currentTreeNode')

  return React.createElement('div', { className: 'content' },
    React.createElement('p', {
      style: {
        overflow: 'hidden',
        margin: '25px',
        maxWidth: '800px' }
      },
      currentTreeNode ))
}

module.exports = Content
