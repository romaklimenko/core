import * as Immutable from 'immutable'
import * as Interfaces from '../interfaces'
export interface IContentProps extends React.Props<Content>, Interfaces.IReduxConnected {} {}

export interface IContentState { }

export class Content extends React.Component<IContentProps, IContentState> {
  render() {
    const state: Immutable.Map<string, any> = this.props.state
    const currentTreeNode: Immutable.Map<string, any> = state.get('currentTreeNode')
    const currentTreeNodeJson = currentTreeNode ? JSON.stringify(currentTreeNode.toJS(), null, '\t') : ''

    return  <div className="content">
              <pre style={{overflow: "hidden", margin: "25px", maxWidth: "800px" }}>
                { currentTreeNodeJson }
              </pre>
            </div>
  }
}