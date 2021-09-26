import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { hideProductCode, showProductCode } from '../state/product-list.actions';

import { Subscription} from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';
import * as fromProductList from '../state';
import { State } from '../state/product-list.reducer';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode: boolean;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  private sub2: Subscription;

  constructor(private productService: ProductService, private store: Store<State>) {
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    this.sub2 = this.store
      .pipe(select(fromProductList.selectShowProductCode))
      .subscribe(
        (showProductCode: boolean) =>
          (this.displayCode = showProductCode)
      );
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  checkChanged(): void {
    if (this.displayCode) {
      this.store.dispatch(hideProductCode());
    } else {
      this.store.dispatch(showProductCode());
    }
  }

  newProduct(): void {
    this.productService.changeSelectedProduct(this.productService.newProduct());
  }

  productSelected(product: Product): void {
    this.productService.changeSelectedProduct(product);
  }

}
