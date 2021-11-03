import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Product } from '../product';
import * as FromProducts from '../state/product-list.actions';
import * as fromProductList from '../state/product-list.selectors';
import { State } from '../state';
import {
  selectCurrentProductId,
  selectAllProducts,
  getError
} from '../state';

@Component({
  templateUrl: './product-shell.component.html'
})
export class ProductShellComponent implements OnInit {
  public errorMessage$: Observable<unknown>;

  public displayCode$: Observable<boolean>;

  public products$: Observable<Product[]>;

  selectedProductId$: Observable<number | null>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.selectedProductId$ = this.store
      .pipe(select(selectCurrentProductId));

    this.products$ = this.store
      .pipe(select(selectAllProducts));

    this.displayCode$ = this.store
      .pipe(select(fromProductList.selectShowProductCode));

    this.store.dispatch(FromProducts.loadProducts());

    this.errorMessage$ = this.store
      .pipe(select(getError));
  }

  public onShowProductCodeChanged(): void {
    this.displayCode$.pipe(
      take(1),
      map((isChecked) => {
        if (isChecked) {
          this.store.dispatch(FromProducts.hideProductCode());
        } else {
          this.store.dispatch(FromProducts.showProductCode());
        }
      })
    )
    .subscribe();
  }

  public onProductSelected(id: number): void {
    this.store.dispatch(FromProducts.setCurrentProduct({ id }));
  }

  public onInitNewProduct(): void {
    this.store.dispatch(FromProducts.initCurrentProduct());
  }
}
