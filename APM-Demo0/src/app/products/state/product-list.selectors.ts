import { createSelector, createFeatureSelector  } from '@ngrx/store';
import { State, ProductState } from './product-list.reducer';

// So that to be used as createFeatureSelector argument, feature key must correspond
// one of the properties of the global state.
export const PRODUCTS_FEATURE_KEY = 'products';

export const selectProducts = createFeatureSelector<State, ProductState>(PRODUCTS_FEATURE_KEY);

export const selectShowProductCode = createSelector(
  selectProducts,
  (productState: ProductState) => productState.showProductCode
);

export const selectCurrentProduct = createSelector(
  selectProducts,
  (productState: ProductState) => productState.currentProduct
);

