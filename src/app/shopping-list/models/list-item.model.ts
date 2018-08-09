import { Item } from './../../items/models/item.model';

export class ListItem {
  constructor(
    public item: Item,
    public qNeeded: number,
    public qStock: number,
    public qToBuy: number,
  ) {}
}
