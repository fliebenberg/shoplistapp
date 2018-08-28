import { ShoppingList } from './shopping-list.model';

export class ListQL {
  constructor(
    public quickList: ShoppingList,
    public qNeeded: number
  ) {}
}
