import { ListItem } from './list-item.model';

export class ShoppingList {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public dateCreated: Date = new Date(),
    public itemsList: ListItem[] = [],
    public quickLists: string[] = []
  ) { }
}
