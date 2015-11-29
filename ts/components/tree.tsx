/// <reference path="../../typings/react/react-global.d.ts" />

'use strict';

interface ITree {
}

class Tree extends React.Component<ITree, {}> {
  public render() {
    return <aside className="tree">
          <img src="img/arrow-expand.svg" alt="" />
          <span>sitecore</span>
          <ul>
            <li>
              <img src="img/arrow-expand.svg" alt="" />
              <span>Content</span>
              <ul>
                <li className="tree-item-selected">
                  <img src="img/arrow-collapse.svg" alt="" />
                  <span>Home</span>
                </li>
              </ul>
            </li>
            <li>
              <img src="img/arrow-expand.svg" alt="" />
              <span>Layout</span>
              <ul>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Controllers</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Devices</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Layouts</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Models</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Placeholder Settings</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Renderings</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Sublayouts</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Simulators</span>
                </li>
              </ul>
            </li>
            <li>
              <img src="img/arrow-expand.svg" alt="" />
              <span>Media Library</span>
            </li>
            <li>
              <img src="img/arrow-expand.svg" alt="" />
              <span>Social</span>
            </li>
            <li>
              <img src="img/arrow-expand.svg" alt="" />
              <span>System</span>
              <ul>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Aliases</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>App Center Sync</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Dictionary</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Languages</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>List Manager</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Marketing Control Center</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Modules</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Proxies</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Publishing targets</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Settings</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Social</span>
                </li>
                <li>
                  <img src="img/arrow-expand.svg" alt="" />
                  <span>Tasks</span>
                </li>
              </ul>
            </li>
          </ul>
        </aside>;
  }
}