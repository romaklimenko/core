'use strict'
{
  const React = require('react')

  const getFields = (state) => {
    const currentTreeNode = state.get('currentTreeNode')
    const fields = state.getIn(['tree', currentTreeNode, 'data', 'Fields'])
    if (fields) {
      return fields.toJS()
    }
    return {}
  }

  const Content = (props) => {

    const fields = getFields(props.state)

    return React.createElement('div', { className: 'content' },
      React.createElement('div',
        {
          style: {
                overflow: 'hidden',
                margin: '25px',
                maxWidth: '800px'
          }
        },
        Object.keys(fields).map((key) => {
          const field = fields[key]
          return React.createElement('div', { key: key },
            React.createElement('h5', null, field.Name + ' (' + field.Type + '):'),
            React.createElement('mark', null, field.Value))
        } )
      )
    )
  }

  module.exports = Content
}