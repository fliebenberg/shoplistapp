import { ListItem } from './list-item.model';

export interface QuickList {
  id: string;
  name: string;
  description: string;
  dateCreated: number;
  itemsList: ListItem[];
}
