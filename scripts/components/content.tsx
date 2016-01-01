export interface IContentProps extends React.Props<Content> {}

export interface IContentState { }

export class Content extends React.Component<IContentProps, IContentState> {
  render() {
    return  <div className="content">&nbsp;</div>
  }
}