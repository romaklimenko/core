'use strict'

import * as Interfaces from '../interfaces'

export interface IContentProps extends React.Props<Content>, Interfaces.IReduxConnected {} {}
export interface IContentState { }

class Content extends React.Component<IContentProps, IContentState> {
  render() {
    const currentTreeNode: Immutable.Map<string, any> = this.props.state.get('currentTreeNode')
    const currentTreeNodeJson: string = currentTreeNode ?
      JSON.stringify(currentTreeNode.toJS(), null, '\t') : ''

    return  <div className="content">
              <pre style={{overflow: "hidden", margin: "25px", maxWidth: "800px" }}>
                { currentTreeNodeJson }
              </pre>
            </div>
  }
}

module.exports = Content