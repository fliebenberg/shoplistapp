import { ListItem } from './list-item.model';

export interface ShoppingList {
  id: string;
  name: string;
  description: string;
  dateCreated: number;
  itemsList: ListItem[];
  quickLists: number[]; // quickList ids
}
