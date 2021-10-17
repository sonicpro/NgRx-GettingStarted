import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import * as FromProducts from './product-list.actions';
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

const productListReducer: ActionReducer<ProductState, Action> =
  createReducer<ProductState>(
    initialState,
    on(FromProducts.showProductCode, (state: ProductState): ProductState => {
      return {
        ...state,
        showProductCode: true,
      };
    }),
    on(FromProducts.hideProductCode, (state: ProductState): ProductState => {
      return {
        ...state,
        showProductCode: false,
      };
    }),
    on(FromProducts.setCurrentProduct, (state: ProductState, action): ProductState => {
      return {
        ...state,
        currentProduct: action.product,
      };
    }),
    on(FromProducts.initCurrentProduct, (state: ProductState): ProductState => {
      return {
        ...state,
        currentProduct: {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0,
        },
      };
    }),
    on(FromProducts.clearCurrentProduct, (state: ProductState): ProductState => {
      return {
        ...state,
        currentProduct: null,
      };
    }),
    on(FromProducts.loadProductsSuccess, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: action.products,
      }
    }),
    on(FromProducts.loadProductsFailure, (state: ProductState, action): ProductState => {
      console.error(action.error);
      return state;
    }),
    on(FromProducts.createProductSuccess, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: [
          ...state.products,
          action.product,
        ],
      };
    }),
    on(FromProducts.createProductFailure, (state: ProductState, action): ProductState => {
      console.error(action.error);
      return state;
    })
  );

export function reducer(state: ProductState | undefined, action: Action) {
  return productListReducer(state, action);
}
