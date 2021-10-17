import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { Product } from '../product';
import { ProductService } from '../product.service';
import * as FromProducts from './product-list.actions';

@Injectable()
export class ProductListEffects {
  /**
   * This is the effect for products load, load success, and load failure actions.
   */
  loadProducts$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FromProducts.loadProducts),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => {
            return FromProducts.loadProductsSuccess({ products });
          }),
          catchError((error: unknown) => {
            return of(FromProducts.loadProductsFailure({ error }));
          })
        );
      })
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FromProducts.createProduct),
      mergeMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map((product) => {
            return FromProducts.createProductSuccess({ product });
          }),
          catchError((error: unknown) => {
            return of(FromProducts.createProductFailure({ error }));
          })
        );
      })
    );
  });

  createProductSuccess$ = createEffect(() => {
    return this.actions.pipe(
      ofType(FromProducts.createProductSuccess),
      map((action) => {
        return FromProducts.setCurrentProduct({ product: action.product });
      })
    );
  });

  constructor(
    private productService: ProductService,
    private actions: Actions
  ) {}
}
