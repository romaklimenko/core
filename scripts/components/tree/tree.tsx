import { IState, IReduxProps } from './../../interfaces'
import * as TreeInterfaces from 'tree-interfaces'

import * as Immutable from 'immutable'
import * as React from 'react'

import * as TreeActions from './tree-actions'
import * as TreeUtils from './tree-utils'

export interface ITreeProps extends IReduxProps {
  path: string
}

export const Tree = (props: ITreeProps) => {
  const getArrow = (state: IState, path: string) => {
    if (props.state.getIn(['tree', path, 'loading'])) {
      return 'img/loading.svg'
    }

    if (TreeUtils.children(state, path).count() === 0) {
      if (props.state.getIn(['tree', path, 'hasChildren'])) {
        return 'img/arrow-collapse.svg'
      }
      return 'img/refresh.svg'
    }
    else {
      return 'img/arrow-expand.svg'
    }
  }

  const toggle = (e) => {
    e.stopPropagation()
    if (TreeUtils.children(props.state, props.path).count() > 0) {
      props.dispatch(TreeActions.collapse(props.path))
    }
    else {
      props.dispatch(TreeActions.expand(props.path))
    }
  }

  const select = (e) => {
    e.stopPropagation()
    props.dispatch(TreeActions.select(props.path))
  }

  const className: string = props.state.get('currentTreeNode') === props.path ?
    'tree-selected' : undefined

  return  <ul>
            <div className={ className } onClick={ e => select(e) }>
              <img
                onClick={ e => toggle(e) }
                src={getArrow(props.state, props.path)}
                style={{ heigth: '16px', width: '16px' }} />
              <span>
                { props.state.getIn(['tree', props.path, 'name']) }
              </span>
            </div>
            <ul>
            {
              TreeUtils.children(props.state, props.path).map((child) => {
                return  <Tree
                          key={ child.get('path') }
                          dispatch={ props.dispatch }
                          path={ child.get('path') }
                          state={ props.state } />
              }).toArray()
            }
            </ul>
          </ul>
}

export default Tree