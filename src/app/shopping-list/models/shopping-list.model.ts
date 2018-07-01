import { ListItem } from './list-item.model';
import { firestore } from 'firebase/app';

export class ShoppingList {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public dateCreated: firestore.Timestamp = firestore.Timestamp.now(),
    public users = {},
    public itemsList: Map<string, ListItem> = null,
    public noItems: number = 0,
    public quickLists: string[] = []
  ) { }
}
