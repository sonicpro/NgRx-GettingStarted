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
  on(showProductCode, (state) => {
    console.log('previous state: ' + JSON.stringify(state));
    return { ...state, showProductCode: true }
  }),
  on(hideProductCode, (state) => {
    console.log('previous state: ' + JSON.stringify(state));
    return { ...state, showProductCode: false }
  }),
)

export function reducer(state: ProductListState | undefined, action: Action) {
  return productListReducer(state, action);
}
