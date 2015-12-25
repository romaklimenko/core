'use strict'

import { Content } from './Content'
import { ITree, ITreeProps, ITreeState, Tree } from './Tree/Tree'
import { Footer } from './Footer'

export interface IContainerProps {
}

export interface IContainerState {
}

const tree: ITree = {
  name: "sitecore",
  children: [
    { name: "Content",
      children: [
        { name: "Home", children: [] },
        { name: "Layout", children: [
          { name: "Controllers", children: [] },
          { name: "Devices", children: [] },
          { name: "Layouts", children: [] },
          { name: "Models", children: [] },
          { name: "Placeholder Settings", children: [] },
          { name: "Renderings", children: [] },
          { name: "Sublayouts", children: [] },
          { name: "Simulators", children: [] }]
        },
        { name: "Media Library", children: [] },
        { name: "Social", children: [] },
        { name: "System", children: [
          { name: "Aliases", children: [] },
          { name: "App Center Sync", children: [] },
          { name: "Dictionary", children: [] },
          { name: "Languages", children: [] },
          { name: "List Manager", children: [] },
          { name: "Marketing Control Center", children: [] },
          { name: "Modules", children: [] },
          { name: "Proxies", children: [] },
          { name: "Publishing Targets", children: [] },
          { name: "Settings", children: [] },
          { name: "Social", children: [] },
          { name: "Tasks", children: [] }]
        }]}]}

const treeProps: ITreeProps = {
  key: tree.name,
  tree: tree
}

export class Container extends React.Component<IContainerProps, IContainerState> {
  render() {
    return <div className="flex-container">
      <div className="flex-row">
        <aside className="tree">
          <Tree key={tree.name} {...treeProps} />
        </aside>
        <Content />
      </div>
      <Footer database="master" />
    </div>
  }
}