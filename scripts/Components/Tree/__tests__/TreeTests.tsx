'use strict';

jest.dontMock('object-assign');
jest.dontMock('../Tree');

const React = require('react');
const ReactDOM = require('react-dom');
const TestUtils = require('react-addons-test-utils');

const Tree = require('../Tree').Tree;

import { ITree, ITreeProps, ITreeState } from '../Tree';

const tree: ITree = {
  name: "[A]",
  children: [
    { name: "[AA]",
      children: [
        { name: "[AAA]", children: [] },
        { name: "[AAB]", children: [] }] },
    { name: "[AB]",
      children: [
        { name: "[ABA]", children: [] },
        { name: "[ABB]", children: [] }] }] };

describe('Tree', () => {
  describe('render', () => {
    it('renders a tree', () => {

      const treeProps: ITreeProps = {
        key: tree.name,
        tree: tree
      };

      const treeComponent = TestUtils.renderIntoDocument(
        <div><Tree key={tree.name} {...treeProps} /></div>
      );

      const treeComponentNode = ReactDOM.findDOMNode(treeComponent).children[0];

      expect(treeComponentNode.textContent).toBe("[A][AA][AAA][AAB][AB][ABA][ABB]");
    });
  });
});