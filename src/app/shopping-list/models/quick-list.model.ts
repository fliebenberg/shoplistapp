import { firestore } from 'firebase/app';
import { ListItem } from './list-item.model';

export class QuickList {
  constructor(
    public id: string = '',
    public name: string = '',
    public description: string = '',
    public dateCreated: firestore.Timestamp = firestore.Timestamp.now(),
    public itemsList: ListItem[] = []
  ) {}
}
