/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface IFooterProps {
  database: string;
}

interface IFooterState {
}

class Footer extends React.Component<IFooterProps, IFooterState> {
  public render() {
    return  <footer id="footer">
              <div>{this.props.database}</div>
            </footer>
  }
}