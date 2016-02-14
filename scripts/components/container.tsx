'use strict'

import * as React from 'react'

import Content from './content'
import Footer from './footer'
import Tree from './tree/tree'

export interface IContainerProps {
  className: string
}
// TODO: check types
export const Container = (props: { className: string, dispatch: any, state: any }) => {
  return React.createElement('div', { className: 'flex-container' },
    React.createElement('div', { className: 'flex-row' },
      React.createElement('aside', { className: 'tree' },
        React.createElement(Tree, {
          key: props.state.get('tree').first().get('path'),
          path: props.state.get('tree').first().get('path'),
          dispatch: props.dispatch, state: props.state })),
      React.createElement(Content, { state: props.state })),
      React.createElement(Footer, { database: 'master' }))
}

export default Container