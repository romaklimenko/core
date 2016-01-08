'use strict'

const React = require('react')

class Footer extends React.Component {
  render() {
    return React.createElement(
      'footer',
      { id: 'footer' },
      React.createElement(
        'div',
        null,
        this.props.database
      )
    )
  }
}

module.exports = Footer
