import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromProductList from '../../state/product-list.reducer';
// import { selectShowProductCode } from '../../state/selectors';
import { hideProductCode, showProductCode } from '../../state/actions';

import { Subscription } from 'rxjs';

import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  pageTitle = 'Products';
  errorMessage: string;

  displayCode$: Observable<boolean>;

  products: Product[];

  // Used to highlight the selected product in the list
  selectedProduct: Product | null;
  sub: Subscription;

  private displayCodeCurrentValue: boolean;
  private sub2: Subscription;

  constructor(private productService: ProductService, private store: Store<fromProductList.AppState>) {
    this.displayCode$ = this.store.select('showProductCode');
  }

  ngOnInit(): void {
    this.sub = this.productService.selectedProductChanges$.subscribe(
      currentProduct => this.selectedProduct = currentProduct
    );

    this.productService.getProducts().subscribe({
      next: (products: Product[]) => this.products = products,
      error: err => this.errorMessage = err
    });

    this.displayCode$.subscribe({
      next: (displayCode: boolean) => this.displayCodeCurrentValue = displayCode
    })
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.sub2.unsubscribe();
  }

  checkChanged(): void {
    if (this.displayCodeCurrentValue) {
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
