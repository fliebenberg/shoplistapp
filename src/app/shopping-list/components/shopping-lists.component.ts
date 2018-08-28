import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subscription, combineLatest } from 'rxjs';
import { map, distinctUntilChanged } from 'rxjs/operators';
import { ShoppingList, QLIST, SLIST } from '../models/shopping-list.model';
import { MyShoppingListService } from '../my-shopping-list.service';
import { getSLArray, ShoppingListsState, getSLLoading, getCurrentSL } from '../store/shopping-list.reducer';
import * as SLActions from '../store/shopping-list.actions';
import { QuickList } from '../models/quick-list.model';

@Component({
  selector: 'app-shopping-lists',
  templateUrl: './shopping-lists.component.html',
})
export class ShoppingListsComponent implements OnInit, OnDestroy {
  routeSub: Subscription;
  currentSLSub: Subscription;
  currentSL: ShoppingList;
  listType = SLIST;
  shoppingLists$: Observable<ShoppingList[]>;
  addQList: boolean;
  oldUrl: UrlSegment[];
  oldSLLoading: boolean;

  constructor(
    public SLStore: Store<ShoppingListsState>,
    public route: ActivatedRoute,
    public router: Router,
    public location: Location,
    public SLService: MyShoppingListService) { }

  ngOnInit() {
    this.routeSub = combineLatest(this.route.url, this.SLStore.select(getSLLoading)).pipe(
      distinctUntilChanged()
    ).subscribe(([url, SLLoading]) => {
      // can remove next 2 lines later. Added for debugging.
      if (this.oldUrl !== url) { console.log('[SListsComponent] New Route: ', url); }
      if (this.oldSLLoading !== SLLoading) { console.log('[SListsComponent] New NewSLLoading: ', SLLoading); }
      this.addQList = false;
      url.forEach(urlSegment => {
        if (urlSegment.path === 'qlists') {
          this.listType = QLIST;
        }
        if (urlSegment.path === 'addqlist') {
          console.log('[SLComponent] addQList set to true', url);
          this.addQList = true;
          this.listType = QLIST;
        }
      });
      // if (url[0].path === 'qlists') {
      //   this.listType = QLIST;
      //   console.log('[SLComponent] ListType changed to QLIST', this.listType);
      // }
      // can remove next 2 lines later. Added for debugging.
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
    this.currentSLSub = this.SLStore.select(getCurrentSL).subscribe((sl: ShoppingList) => {
      this.currentSL = sl;
    });
  }

  newShoppingList() {
    const newSL = this.SLService.createNewSL(this.listType);
    this.SLStore.dispatch(new SLActions.AddShoppingList(newSL));
    this.router.navigate(['/', this.listType, newSL.id, {back: this.listType !== 'qlist' ? 'Shopping Lists' : 'Quick Lists'}]);
    // const newSL = this.slService.createNewSL();
    // this.slStore.dispatch(new slActions.AddShoppingList(newSL));
    // this.router.navigate([this.listType, "add"]);
    // if (this.listType = QLIST) {
    //   this.router.navigate(['/qlist/add']);
    // } else {
    //   this.router.navigate(['/list/add']);
    // }
  }

  listSelected(selectedList: ShoppingList) {
    if (this.addQList) {
      this.SLStore.dispatch(new SLActions.IncreaseSLQList({quickList: selectedList, SL: this.currentSL.id}));
      this.location.back();
    } else {
      this.router.navigate(['/', selectedList.listType, selectedList.id, {back: selectedList.listType !== 'qlist' ? 'Shopping Lists' : 'Quick Lists'}]);
    }
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
    this.currentSLSub.unsubscribe();
  }
}
