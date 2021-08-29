import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { showProductCode, hideProductCode } from './actions';

export const PRODUCTS_FEATURE_KEY = 'products';

export interface ProductListState {
  showProductCode: boolean;
}

const initialState: ProductListState = {
  showProductCode: true
};

const productListReducer: ActionReducer<ProductListState, Action> = createReducer(
  initialState,
  on(showProductCode, (state) => ({ ...state, showProductCode: true })),
  on(hideProductCode, (state) => ({ ...state, showProductCode: false })),
)

export function reducer(state: ProductListState | undefined, action: Action) {
  return productListReducer(state, action);
}
