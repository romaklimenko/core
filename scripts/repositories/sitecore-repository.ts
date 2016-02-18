import { IItem } from '../interfaces'
import IRepository from './repository'
import * as request from 'superagent'

const host = 'http://sitecore.api'

const getChildren = (itemId): Promise<IItem[]> => {
  return new Promise(
    resolve => {
      request
        .get(host + '/-/item/v1/')
        .query({ scope: 'c', sc_itemid: itemId })
        .end((error, response) => {
          resolve(<IItem[]>response.body.result.items)
        })
    }
  )
}

const getItem = (itemId) => {
  return new Promise(
    resolve => {
      request
        .get(host + '/-/item/v1/')
        .query({ scope: 's', sc_itemid: itemId })
        .end((error, response) => {
          resolve(response.body.result.items[0])
        })
    }
  )
}

export const Repository: IRepository = {
  getChildren,
  getItem
}

export default Repository