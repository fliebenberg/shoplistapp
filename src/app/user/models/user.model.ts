import { ShoppingList } from './../../shopping-list/models/shopping-list.model';

export class User {
  constructor(
    public id: string = '',
    public firstName: string = '',
    public lastName: string = '',
    public email: string = '',
    public photoUrl: string = '',
    public shoppingLists: ShoppingList[] = []
  ) {}
}
