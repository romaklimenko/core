import * as React from 'react'

export interface IFooterProps {
  database: string
}

export const Footer = (props: IFooterProps) => {
  return  <footer id="footer">
            <div>{props.database}</div>
          </footer>
}

export default Footer