import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import * as FromProducts from './product-list.actions';

@Injectable()
export class ProductListEffects {
  /**
   * This is the effect for products load, load success, and load failure actions.
   */
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
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
    return this.actions$.pipe(
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
    return this.actions$.pipe(
      ofType(FromProducts.createProductSuccess),
      map((action) => {
        return FromProducts.setCurrentProduct({ product: action.product });
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromProducts.updateProduct),
      switchMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map((product) => {
            return FromProducts.updateProductsSuccess({ product });
          }),
          catchError((error: unknown) => {
            return of(FromProducts.updateProductsFailure({ error }));
          })
        );
      })
    );
  });

  updateProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromProducts.updateProductsSuccess),
      map((action) => {
        return FromProducts.setCurrentProduct({ product: action.product });
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromProducts.deleteProduct),
      mergeMap((action) => {
        return this.productService.deleteProduct(action.product.id).pipe(
          map(() => {
            return FromProducts.deleteProductSuccess();
          }),
          catchError((error: unknown) => {
            return of(FromProducts.deleteProductFailure({ error }));
          })
        );
      })
    );
  });

  deleteProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromProducts.deleteProductSuccess),
      map(() => {
        return FromProducts.clearCurrentProduct();
      })
    )
  });

  clearCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(FromProducts.clearCurrentProduct),
      map(() => {
        return FromProducts.loadProducts();
      })
    )
  });

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}
}
