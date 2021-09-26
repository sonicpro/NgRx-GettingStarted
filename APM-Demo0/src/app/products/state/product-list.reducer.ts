import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { showProductCode, hideProductCode } from './product-list.actions';
import { Product } from '../product';
import * as fromAppState from '../../state/app.state';

export interface ProductState {
  showProductCode: boolean;
  currentProduct: Product;
  products: Product[];
}

export interface State extends fromAppState.State {
  products: ProductState;
}

/* Will be used in effects
export interface ProductsPartialState {
  readonly [PRODUCTS_FEATURE_KEY]: ProductState;
}
*/

const initialState: ProductState = {
  showProductCode: true,
  currentProduct: null,
  products: []
};

const productListReducer: ActionReducer<ProductState, Action> = createReducer<ProductState>(
  initialState,
  on(showProductCode, (state: ProductState) => ({ ...state, showProductCode: true })),
  on(hideProductCode, (state: ProductState) => ({ ...state, showProductCode: false })),
)

export function reducer(state: ProductState | undefined, action: Action) {
  return productListReducer(state, action);
}
