import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import * as FromProducts from './product-list.actions';
import { Product } from '../product';
import * as fromAppState from '../../state/app.state';
import { ProductService } from '../product.service';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: unknown;
}

export interface State extends fromAppState.State {
  products: ProductState;
}

const initialState: ProductState = {
  showProductCode: true,
  currentProductId: null,
  products: [],
  error: ''
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
        currentProductId: action.id,
      };
    }),
    on(FromProducts.initCurrentProduct, (state: ProductState): ProductState => {
      const newProduct: Product = {
          id: 0,
          productName: '',
          productCode: 'New',
          description: '',
          starRating: 0,
      };
      return {
        ...state,
        currentProductId: 0,
        products: [
          ...state.products,
          newProduct,
        ]
      };
    }),
    on(FromProducts.clearCurrentProduct, (state: ProductState): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }),
    on(FromProducts.loadProductsSuccess, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }),
    on(FromProducts.loadProductsFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
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
      return {
        ...state,
        error: action.error,
      };
    }),
    on(FromProducts.updateProductsSuccess, (state: ProductState, action): ProductState => {
      // splice() mutates the existing array. That is why we had to use "oldProducts" copy of the state.
      // const oldProducts = state.products.slice();
      // const updatedProductIndex = oldProducts.findIndex(p => p.id === action.product.id);
      // oldProducts.splice(updatedProductIndex, 1, action.product);

      const newProducts = state.products.map((product: Product) => {
        if (product.id === action.product.id) {
          return action.product;
        } else {
          return product;
        }
      });
      return {
        ...state,
        products: newProducts,
      };
    }),
    on(FromProducts.updateProductsFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }),
    on(FromProducts.deleteProductFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    })
  );

export function reducer(state: ProductState | undefined, action: Action) {
  return productListReducer(state, action);
}
