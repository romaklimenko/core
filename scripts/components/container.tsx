import * as React from 'react'

import Content from './content'
import { IFooterProps, Footer } from './footer'
import Tree from './tree/tree'

export const Container = (props: { className: string, dispatch: any, state: any }) => {
  const key = props.state.get('tree').first().get('path')
  const path = props.state.get('tree').first().get('path')
  return  <div className="flex-container">
            <div className="flex-row">
             <aside className="tree">
               <Tree
                 key={key}
                 path={path}
                 dispatch={props.dispatch}
                 state={props.state} />
             </aside>
             <Content state={props.state} />
             <Footer database="master" />
            </div>
          </div>
}

export default Container