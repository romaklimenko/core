'use strict';

jest.dontMock('object-assign');
jest.dontMock('../tree');

let React = require('react');
let ReactDOM = require('react-dom');
let TestUtils = require('react-addons-test-utils');

const Tree = require('../tree').Tree;

import { ITree, ITreeProps, ITreeState } from '../tree';

describe('Tree', () => {
  it('renders', () => {
    let tree: ITree = {
      name: "[A]",
      children: [
        {
          name: "[AA]",
          children: [
            {
              name: "[AAA]",
              children: []
            },
            {
              name: "[AAB]",
              children: []
            }
          ]
        },
        {
          name: "[AB]",
          children: [
            {
              name: "[ABA]",
              children: []
            },
            {
              name: "[ABB]",
              children: []
            }
          ]
        }
      ]
    };

    let treeProps: ITreeProps = {
      key: tree.name,
      tree: tree
    };

    let treeComponent = TestUtils.renderIntoDocument(
      <div><Tree key={tree.name} {...treeProps} /></div>
    );

    let treeComponentNode = ReactDOM.findDOMNode(treeComponent).children[0];

    expect(treeComponentNode.textContent).toBe("[A][AA][AAA][AAB][AB][ABA][ABB]");
  });
});