/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface IContainerProps {
}

interface IContainerState {
}

var tree: ITree = {
  name: "sitecore",
  children: [
    {
      name: "Content",
      children: [
        {
          name: "Home",
          children: []
        },
        {
          name: "Layout",
          children: [
            {
              name: "Controllers",
              children: []
            },
            {
              name: "Devices",
              children: []
            },
            {
              name: "Layouts",
              children: []
            },
            {
              name: "Models",
              children: []
            },
            {
              name: "Placeholder Settings",
              children: []
            },
            {
              name: "Renderings",
              children: []
            },
            {
              name: "Sublayouts",
              children: []
            },
            {
              name: "Simulators",
              children: []
            }
          ]
        },
        {
          name: "Media Library",
          children: []
        },
        {
          name: "Social",
          children: []
        },
        {
          name: "System",
          children: [
            {
              name: "Aliases",
              children: []
            },
            {
              name: "App Center Sync",
              children: []
            },
            {
              name: "Dictionary",
              children: []
            },
            {
              name: "Languages",
              children: []
            },
            {
              name: "List Manager",
              children: []
            },
            {
              name: "Marketing Control Center",
              children: []
            },
            {
              name: "Modules",
              children: []
            },
            {
              name: "Proxies",
              children: []
            },
            {
              name: "Publishing Targets",
              children: []
            },
            {
              name: "Settings",
              children: []
            },
            {
              name: "Social",
              children: []
            },
            {
              name: "Tasks",
              children: []
            }
          ]
        }
      ]
    }
  ]
};

var treeProps: ITreeProps = {
  key: tree.name,
  tree: tree
};

class Container extends React.Component<IContainerProps, IContainerState> {
  public render() {
    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={tree.name} {...treeProps} />
        </aside>
        <Content />
      </div>
      <Footer database="master" />
    </div>;
  }
}