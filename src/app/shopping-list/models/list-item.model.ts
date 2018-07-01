import { Item } from './../../items/models/item.model';

export class ListItem {
  constructor(
    public id: string,
    public itemId: Item,
    public qNeeded: number,
    public qStock: number,
    public qToBuy: number,
  ) {}
}
