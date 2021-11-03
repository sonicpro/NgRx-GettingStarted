import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { ProductService } from '../product.service';
import { ProductPageActions, ProductApiActions } from './actions';

@Injectable()
export class ProductListEffects {
  /**
   * This is the effect for products load, load success, and load failure actions.
   */
  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.loadProducts),
      switchMap(() => {
        return this.productService.getProducts().pipe(
          map((products) => {
            return ProductApiActions.loadProductsSuccess({ products });
          }),
          catchError((error: unknown) => {
            return of(ProductApiActions.loadProductsFailure({ error }));
          })
        );
      })
    );
  });

  createProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.createProduct),
      mergeMap((action) => {
        return this.productService.createProduct(action.product).pipe(
          map((product) => {
            return ProductApiActions.createProductSuccess({ product });
          }),
          catchError((error: unknown) => {
            return of(ProductApiActions.createProductFailure({ error }));
          })
        );
      })
    );
  });

  createProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductApiActions.createProductSuccess),
      map((action) => {
        return ProductPageActions.setCurrentProduct({ id: action.product.id });
      })
    );
  });

  updateProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.updateProduct),
      switchMap((action) => {
        return this.productService.updateProduct(action.product).pipe(
          map((product) => {
            return ProductApiActions.updateProductsSuccess({ product });
          }),
          catchError((error: unknown) => {
            return of(ProductApiActions.updateProductsFailure({ error }));
          })
        );
      })
    );
  });

  updateProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductApiActions.updateProductsSuccess),
      map((action) => {
        return ProductPageActions.setCurrentProduct({ id: action.product.id });
      })
    );
  });

  deleteProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.deleteProduct),
      mergeMap((action) => {
        return this.productService.deleteProduct(action.product.id).pipe(
          map(() => {
            return ProductApiActions.deleteProductSuccess();
          }),
          catchError((error: unknown) => {
            return of(ProductApiActions.deleteProductFailure({ error }));
          })
        );
      })
    );
  });

  deleteProductSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductApiActions.deleteProductSuccess),
      map(() => {
        return ProductPageActions.clearCurrentProduct();
      })
    )
  });

  clearCurrentProduct$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductPageActions.clearCurrentProduct),
      map(() => {
        return ProductPageActions.loadProducts();
      })
    )
  });

  constructor(
    private productService: ProductService,
    private actions$: Actions
  ) {}
}
