export interface IFooterProps extends React.Props<Footer> {
  database: string
}

export interface IFooterState { }

export class Footer extends React.Component<IFooterProps, IFooterState> {
  render() {
    return  <footer id="footer">
              <div>{this.props.database}</div>
            </footer>
  }
}