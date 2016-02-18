import { IItem } from '../interfaces'

export interface IRepository {
  getChildren(itemId: string): Promise<IItem[]>
  getItem(itemId: string): Promise<IItem[]>
}

export default IRepository