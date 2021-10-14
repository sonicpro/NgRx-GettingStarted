import { createAction, props } from '@ngrx/store';
import { Product } from '../product';

export const showProductCode = createAction('[Product] Show Product Code');

export const hideProductCode = createAction('[Product] Hide Product Code');

export const setCurrentProduct = createAction(
  '[Product] Set Current Product',
  props<{ product: Product }>()
);

export const clearCurrentProduct = createAction('[Product] Clear Current Product');

export const initCurrentProduct = createAction('[Product] Init Current Product');
