import { ListItem } from './list-item.model';
import { firestore } from 'firebase/app';

export class ShoppingList {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public dateCreated: firestore.Timestamp = firestore.Timestamp.now(),
    public itemsList: ListItem[] = [],
    public quickLists: string[] = []
  ) { }
}
