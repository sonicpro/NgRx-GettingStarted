import { createAction, props } from '@ngrx/store';
import { Product } from '../../product';

export const loadProductsSuccess = createAction(
  '[Product/API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product/API] Load Failure',
  props<{ error: unknown }>()
);

export const createProductSuccess = createAction(
  '[Product/API] Create Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction(
  '[Product/API] Create Failure',
  props<{ error: unknown }>()
);

export const updateProductsSuccess = createAction('[Product/API] Update Success',
  props<{ product: Product }>()
);

export const updateProductsFailure = createAction('[Product/API] Update Failure',
  props<{ error: unknown }>()
);

export const deleteProductSuccess = createAction('[Product/API] Delete Success');

export const deleteProductFailure = createAction('[Product/API] Delete Failure',
  props<{ error: unknown }>()
);
