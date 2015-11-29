/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface IContainer {
}

class Container extends React.Component<IContainer, {}> {
  public render() {
    return <div className="flex-container">
      <div className="flex-row">
        <Tree />
        <Content />
      </div>
      <Footer database="master" />
    </div>;
  }
}