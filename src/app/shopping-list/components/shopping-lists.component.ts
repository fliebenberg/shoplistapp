import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ShoppingList, QLIST, SLIST } from '../models/shopping-list.model';
import { MyShoppingListService } from '../my-shopping-list.service';
import { getSLArray, ShoppingListsState, getSLLoading } from '../store/shopping-list.reducer';
import * as SLActions from '../store/shopping-list.actions';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit {
  routeSub: Subscription;
  listType = SLIST;
  shoppingLists$: Observable<ShoppingList[]>;
  oldUrl: UrlSegment[];
  oldSLLoading: boolean;

  constructor(
    public SLStore: Store<ShoppingListsState>,
    public route: ActivatedRoute,
    public router: Router,
    public SLService: MyShoppingListService) { }

  ngOnInit() {
    this.routeSub = combineLatest(this.route.url, this.SLStore.select(getSLLoading)).pipe(
      distinctUntilChanged()
    ).subscribe(([url, SLLoading]) => {
      if (this.oldUrl !== url) { console.log('[SListsComponent] New Route: ', url); }
      if (this.oldSLLoading !== SLLoading) { console.log('[SListsComponent] New NewSLLoading: ', SLLoading); }
      if (url[0].path === 'qlists') {
        this.listType = QLIST;
        console.log('[SLComponent] ListType changed to QLIST', this.listType);
      }
      this.oldUrl = url;
      this.oldSLLoading = SLLoading;
    });
    this.shoppingLists$ = this.SLStore.select(getSLArray).pipe(
      map((listArray: ShoppingList[]) => {
        return listArray.filter((list: ShoppingList) => {
          return list.listType === this.listType;
        });
      })
    );
  }

  newShoppingList() {
    const newSL = this.SLService.createNewSL(this.listType);
    this.SLStore.dispatch(new SLActions.AddShoppingList(newSL));
    this.router.navigate(['/', this.listType, newSL.id, {back: ''}]);
    // const newSL = this.slService.createNewSL();
    // this.slStore.dispatch(new slActions.AddShoppingList(newSL));
    // this.router.navigate([this.listType, "add"]);
    // if (this.listType = QLIST) {
    //   this.router.navigate(['/qlist/add']);
    // } else {
    //   this.router.navigate(['/list/add']);
    // }
  }
}
