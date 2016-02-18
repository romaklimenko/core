import * as React from 'react'

const getFields = (state) => {
  const currentTreeNode = state.get('currentTreeNode')
  const fields = state.getIn(['tree', currentTreeNode, 'data', 'Fields'])
  if (fields) return fields.toJS()
  return {}
}

export interface IContentProps { }

export const Content = (props) => {
  const fields = getFields(props.state)

  return  <div className="content">
            <div style={{overflow: "hidden", margin: "25px", maxWidth: "800px" }}>
            {
              Object.keys(fields).map((key) => {
                const field = fields[key]
                return  <div key={key}>
                          <h5>{field.Name + ' (' + field.Type + '):' }</h5>
                          <mark>{field.Value}</mark>
                        </div>
              })
            }
            </div>
          </div>
}
     
export default Content