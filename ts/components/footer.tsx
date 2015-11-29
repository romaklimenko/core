/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface IFooter {
  database: string;
}

class Footer extends React.Component<IFooter, {}> {
  public render() {
    return  <footer id="footer">
              <div>{this.props.database}</div>
            </footer>
  }
}