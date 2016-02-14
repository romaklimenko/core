export interface IRepository {
  getChildren(itemId: string): Promise<any[]> // TODO: IItem
  getItem(itemId: string): Promise<any[]> // TODO: IItem
}

export default IRepository