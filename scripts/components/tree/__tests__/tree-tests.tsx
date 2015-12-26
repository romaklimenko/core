'use strict'

jest.dontMock('object-assign')
jest.dontMock('../tree')

const Immutable = require('immutable')
const React = require('react')
const ReactDOM = require('react-dom')
const TestUtils = require('react-addons-test-utils')

const Tree = require('../tree').Tree

import { ITree, ITreeProps, ITreeState } from '../tree'

const tree: Immutable.Map<string, any> = Immutable.fromJS({
  id: "[A]",
  name: "[A]",
  path: "[A]",
  children: [
    { id: "[AA]", name: "[AA]", path: "[A]/[AA]",
      children: [
        { id: "[AAA]", name: "[AAA]", path: "[A]/[AA]/[AAA]", children: [] },
        { id: "[AAB]", name: "[AAB]", path: "[A]/[AA]/[AAB]", children: [] }] },
    { id: "[AB]", name: "[AB]", path: "[A]/[AB]",
      children: [
        { id: "[ABA]", name: "[ABA]", path: "[A]/[AB]/[ABA]", children: [] },
        { id: "[ABB]", name: "[ABB]", path: "[A]/[AA]/[ABB]", children: [] }] }] })

describe('Tree', () => {
  describe('render', () => {
    it('renders a tree', () => {
      const treeComponent = TestUtils.renderIntoDocument(
        <div>
          <Tree key={tree.get('path')}
            dispatch={() => { console.info('dispatch') }} {...{ tree: tree }} />
        </div>
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
        <div>
          <Tree key={tree.get('path')}
            dispatch={() => { console.info('dispatch') }} {...{ tree: tree }} />
        </div>
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