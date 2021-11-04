import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { Product } from '../product';
import { ProductPageActions }from '../state';
import * as fromProductList from '../state/product.selectors';
import { State } from '../state';
import {
  selectCurrentProductId,
  selectCurrentProduct,
  selectAllProducts,
  getError,
} from '../state';

@Component({
  templateUrl: './product-shell.component.html',
})
export class ProductShellComponent implements OnInit {
  public errorMessage$: Observable<unknown>;

  public displayCode$: Observable<boolean>;

  public products$: Observable<Product[]>;

  public selectedProductId$: Observable<number | null>;

  public currentProduct$: Observable<Product>;

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.selectedProductId$ = this.store
      .pipe(select(selectCurrentProductId));

    // Watch for changes to the currently selected product
    this.currentProduct$ = this.store
      .pipe(select(selectCurrentProduct));

    this.products$ = this.store
      .pipe(select(selectAllProducts));

    this.displayCode$ = this.store
      .pipe(select(fromProductList.selectShowProductCode));

    this.store.dispatch(ProductPageActions.loadProducts());

    this.errorMessage$ = this.store
      .pipe(select(getError));
  }

  public onShowProductCodeChanged(): void {
    this.displayCode$.pipe(
      take(1),
      map((isChecked) => {
        if (isChecked) {
          this.store.dispatch(ProductPageActions.hideProductCode());
        } else {
          this.store.dispatch(ProductPageActions.showProductCode());
        }
      })
    )
    .subscribe();
  }

  public onProductSelected(id: number): void {
    this.store.dispatch(ProductPageActions.setCurrentProduct({ id }));
  }

  public onInitNewProduct(): void {
    this.store.dispatch(ProductPageActions.initCurrentProduct());
  }

  public onDeleteProduct(product: Product): void {
    if (product && product.id) {
      if (confirm(`Really delete the product: ${product.productName}?`)) {
        this.store.dispatch(ProductPageActions.deleteProduct({ product }));
      }
    } else {
      // No need to delete, it was never saved
      this.store.dispatch(ProductPageActions.clearCurrentProduct());
    }
  }

  public onSaveProduct(updatedOrNewProduct: Product): void {
    if (updatedOrNewProduct.id === 0) {
      this.store.dispatch(ProductPageActions.createProduct({ product: updatedOrNewProduct }));
    } else {
      this.store.dispatch(ProductPageActions.updateProduct({ product: updatedOrNewProduct }));
    }
  }
}
