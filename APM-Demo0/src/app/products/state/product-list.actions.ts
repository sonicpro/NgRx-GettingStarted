import { NgIf } from '@angular/common';
import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';

export const showProductCode = createAction('[Product] Show Product Code');

export const hideProductCode = createAction('[Product] Hide Product Code');

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ id: number }>()
);

export const clearCurrentProduct = createAction(
  '[Product] Clear Current Product'
);

export const initCurrentProduct = createAction(
  '[Product] Init Current Product'
);

export const loadProducts = createAction('[Product/API] Load');

export const loadProductsSuccess = createAction(
  '[Product/API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product/API] Load Failure',
  props<{ error: unknown }>()
);

export const createProduct = createAction(
  '[Product/API] Create',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction(
  '[Product/API] Create Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product/API] Create Failure',
  props<{ error: unknown }>()
);

export const updateProduct = createAction(
  '[Product/API] Update',
  props<{ product: Product }>()
);

export const updateProductsSuccess = createAction('[Product/API] Update Success',
  props<{ product: Product }>()
);

export const updateProductsFailure = createAction('[Product/API] Update Failure',
  props<{ error: unknown }>()
);

export const deleteProduct = createAction('[Product/API] Delete',
  props<{ product: Product }>()
);

export const deleteProductSuccess = createAction('[Product/API] Delete Success');

export const deleteProductFailure = createAction('[Product/API] Delete Failure',
  props<{ error: unknown }>()
);
