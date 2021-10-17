import { createAction, props } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../product';

export const showProductCode = createAction('[Product] Show Product Code');

export const hideProductCode = createAction('[Product] Hide Product Code');

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initCurrentProduct = createAction('[Product] Init Current Product');

export const loadProducts = createAction('[Product/API] Load');

export const loadProductsSuccess = createAction('[Product/API] Load Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction('[Product/API] Load Failure',
  props<{ error: unknown }>()
);

export const createProduct = createAction('[Product/API] Create',
  props<{ product: Product }>()
);

export const createProductSuccess = createAction('[Product/API] Create Success',
  props<{ product: Product }>()
);

export const createProductFailure = createAction('[Product/API] Load Failure',
  props<{ error: unknown }>()
);

// export const loadProducts = createAction('[Product/API] Load');

// export const loadProductsSuccess = createAction('[Product/API] Load Success',
//   props<{ products: Product[] }>()
// );

// export const loadProductsFailure = createAction('[Product/API] Load Failure',
//   props<{ error: unknown }>()
// );

// export const loadProducts = createAction('[Product/API] Load');

// export const loadProductsSuccess = createAction('[Product/API] Load Success',
//   props<{ products: Product[] }>()
// );

// export const loadProductsFailure = createAction('[Product/API] Load Failure',
//   props<{ error: unknown }>()
// );
