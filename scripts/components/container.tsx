'use strict'

import * as Interfaces from '../interfaces'

const Content = require('./content')
const Footer = require('./footer')
const Tree = require('./tree/tree')

export interface IContainerProps extends React.Props<Container>, Interfaces.IReduxConnected {}
export interface IContainerState {}

class Container extends React.Component<IContainerProps, IContainerState> {
  render() {
    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={this.props.state.getIn(['tree', 'id'])}
            dispatch={this.props.dispatch} state={this.props.state}
            tree={this.props.state.get('tree')} />
        </aside>
        <Content state={this.props.state} />
      </div>
      <Footer database="master" />
    </div>
  }
}

module.exports = Container