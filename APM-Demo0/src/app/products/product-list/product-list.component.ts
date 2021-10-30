import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as FromProducts from '../state/product-list.actions';

import { Observable, Subscription} from 'rxjs';

import { Product } from '../product';
import * as fromProductList from '../state';
import { State } from '../state/product-list.reducer';
import { selectCurrentProduct, selectAllProducts, getError } from '../state';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  public pageTitle = 'Products';
  public errorMessage$: Observable<unknown>;

  public displayCode$: Observable<boolean>;

  public products$: Observable<Product[]>;

  // Used to highlight the selected product in the list
  selectedProduct$: Observable<Product | null>;

  constructor(
    private store: Store<State>
  ) {}

  ngOnInit(): void {
    this.selectedProduct$ = this.store
      .pipe(select(selectCurrentProduct));

    this.products$ = this.store
      .pipe(select(selectAllProducts));

    this.displayCode$ = this.store
      .pipe(select(fromProductList.selectShowProductCode));

    this.store.dispatch(FromProducts.loadProducts());

    this.errorMessage$ = this.store
      .pipe(select(getError));
  }

  checkChanged(): void {
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

  newProduct(): void {
    this.store.dispatch(FromProducts.initCurrentProduct());
  }

  productSelected(product: Product): void {
    this.store.dispatch(FromProducts.setCurrentProduct({ product }));
  }
}
