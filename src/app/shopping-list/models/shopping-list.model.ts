import { ListItem } from './list-item.model';
import { ListQL } from './list-ql.model';
import { firestore } from 'firebase/app';

export const SLIST = 'slist';
export const QLIST = 'qlist';

export class ShoppingList {
  constructor(
    public id: string = '',
    public listType: string = SLIST, // listType is either "slist" or "qlist"
    public name: string = '',
    public description: string = '',
    public dateCreated: firestore.Timestamp = firestore.Timestamp.now(),
    public users = {},
    public itemsList: ListItem[] = [],
    // public itemsListMap: Map<string, ListItem> = null,
    public noItems: number = 0,
    public quickLists: ListQL[] = []
  ) { }
}
