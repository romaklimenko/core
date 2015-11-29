/// <reference path="../../typings/react/react-global.d.ts" />
'use strict';

let mountNode: any = document.getElementsByTagName("footer")[0];

interface IFooter {
  database: string;
}

class Footer extends React.Component<IFooter, {}> {
  public render() {
    return <div>{this.props.database}</div>;
  }
}

ReactDOM.render(<Footer database="master" />, mountNode);