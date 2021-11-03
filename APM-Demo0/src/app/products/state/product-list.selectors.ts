import { createSelector, createFeatureSelector  } from '@ngrx/store';
import { State } from '../state';
import { ProductState } from './product-list.reducer';

// So that to be used as createFeatureSelector argument, feature key must correspond
// one of the properties of the global state.
export const PRODUCTS_FEATURE_KEY = 'products';

export const selectProducts = createFeatureSelector<State, ProductState>(PRODUCTS_FEATURE_KEY);

export const selectShowProductCode = createSelector(
  selectProducts,
  (productState: ProductState) => {
    return productState.showProductCode;
  }
);

export const selectCurrentProductId = createSelector(
  selectProducts,
  (productState: ProductState) => {
    return productState.currentProductId;
  }
)
export const selectCurrentProduct = createSelector(
  selectProducts,
  selectCurrentProductId,
  (productState: ProductState, id: number) => {
    return productState.products.find((p) => {
      return p.id === id;
    });
  }
);

export const selectAllProducts = createSelector(
  selectProducts,
  (productState: ProductState) => {
    return productState.products;
  }
);

export const getError = createSelector(
  selectProducts,
  (productState: ProductState) => {
    return productState.error;
  }
)
