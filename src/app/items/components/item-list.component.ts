import { getSLLoading } from './../../shopping-list/store/shopping-list.reducer';
import { ShoppingList } from './../../shopping-list/models/shopping-list.model';
import { getCategoriesExcludeCount } from './../store/items.reducer';
import { ItemsState } from '../store/items.reducer';
import { Store } from '@ngrx/store';
import { Router, ActivatedRoute, UrlSegment, ParamMap } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { Item } from '../models/item.model';
import { MyItemsService } from '../my-items.service';
import { ShoppingListsState } from '../../shopping-list/store/shopping-list.reducer';
import { MyShoppingListService } from '../../shopping-list/my-shopping-list.service';
import * as SLActions from '../../shopping-list/store/shopping-list.actions';
import { Location } from '@angular/common';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html'
})
export class ItemListComponent implements OnInit, OnDestroy {
  loading: boolean;
  items: Item[];
  categories: Map<string, boolean>;
  filteredItems: Item[];
  $itemsState: Observable<ItemsState>;
  routeSub: Subscription;
  itemsSub: Subscription;
  SLSub: Subscription;
  categoriesExcludeCount$: Observable<number>;
  currentSL: ShoppingList;
  allowEdit = false;


  constructor(
    public itemsService: MyItemsService,
    public SLService: MyShoppingListService,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public itemStore: Store<ItemsState>,
    public SLStore: Store<ShoppingListsState>
  ) {}

  ngOnInit() {
    this.routeSub = combineLatest(this.route.url, this.route.paramMap, this.SLStore.select(getSLLoading)).subscribe(([url, paramMap, SLLoading]) => {
      if (url[0].path.includes('list') && paramMap.has('id')) {
        this.currentSL = this.SLService.getShoppingList(paramMap.get('id'));
        console.log('[ItemListComponent] ShoppingList: ', this.currentSL);
        this.allowEdit = false;
      } else {
        this.currentSL = null;
        this.allowEdit = true;
      }
    });
    this.$itemsState = this.itemStore.select('itemsState');
    this.categoriesExcludeCount$ = this.itemStore.select(getCategoriesExcludeCount);
    // if ( this.itemsService.filteredItems ) { this.items = this.itemsService.filteredItems; }
    this.itemsSub = this.$itemsState.subscribe(state => {
      this.items = state.items;
      this.categories = state.categories;
      this.applyFilter('');
      this.loading = state.loading;
    });
    // this.$items = this.itemsService.$items;
  }

  addItem() {
    this.router.navigate(['/items/add', {'back': ''}]);
  }

  applyFilter(searchText: string) {
    this.filteredItems = this.itemsService.filterItems(this.items, searchText, this.categories);
  }

  addSLItem(item: Item) {
    console.log('[ItemListComponent] Function addSLItem called. CurrentSL:', this.currentSL);
    this.SLStore.dispatch(new SLActions.IncreaseSLItem({item: item, SL: this.currentSL.id}));
    console.log('[ItemListComponent] Going back...', this.location);
    this.location.back();
    // this.router.navigate([this.currentSL.listType, this.currentSL.id]);
  }
  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.itemsSub.unsubscribe();
  }
}
