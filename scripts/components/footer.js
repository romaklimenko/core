'use strict'

const React = require('react')

const Footer = (props) => {
  return React.createElement('footer', { id: 'footer' },
    React.createElement('div', null, props.database)) }

module.exports = Footer
