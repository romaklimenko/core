'use strict'

jest.dontMock('object-assign')
jest.dontMock('../Tree')

const React = require('react')
const ReactDOM = require('react-dom')
const TestUtils = require('react-addons-test-utils')

const Tree = require('../Tree').Tree

import { ITree, ITreeProps, ITreeState } from '../Tree'

const tree: ITree = {
  name: "[A]",
  childTrees: [
    { name: "[AA]",
      childTrees: [
        { name: "[AAA]", childTrees: [] },
        { name: "[AAB]", childTrees: [] }] },
    { name: "[AB]",
      childTrees: [
        { name: "[ABA]", childTrees: [] },
        { name: "[ABB]", childTrees: [] }] }] }

const treeProps: ITreeProps = {
  key: tree.name,
  tree: tree,
  onToggleCollapsed: () => { }
};

describe('Tree', () => {
  describe('render', () => {
    it('renders a tree', () => {
      const treeComponent = TestUtils.renderIntoDocument(
        <div><Tree key={tree.name} {...treeProps} /></div>
      );

      const A: Element = ReactDOM.findDOMNode(treeComponent).children[0]
      expect(A.textContent).toBe("[A][AA][AAA][AAB][AB][ABA][ABB]")

      const A_AA: Element = A.querySelector('ul > ul:nth-child(1)')
      expect(A_AA.textContent).toBe("[AA][AAA][AAB]")

      const A_AA_AAA: Element = A_AA.querySelector('ul > ul:nth-child(1)')
      expect(A_AA_AAA.textContent).toBe("[AAA]")
    })

    it('sets appropriate arrow to tree node', () => {
      const treeComponent = TestUtils.renderIntoDocument(
        <div><Tree key={tree.name} {...treeProps} /></div>
      )

      const A: Element = ReactDOM.findDOMNode(treeComponent).children[0]
      expect(A.querySelector('svg').className).toBe("tree-arrow-expanded")

      const A_AA: Element = A.querySelector('ul > ul:nth-child(1)')
      expect(A_AA.querySelector('svg').className).toBe("tree-arrow-expanded")

      const A_AA_AAA: Element = A_AA.querySelector('ul > ul:nth-child(1)')
      expect(A_AA_AAA.querySelector('svg').className).toBe("tree-arrow-collapsed")
    })
  })
})