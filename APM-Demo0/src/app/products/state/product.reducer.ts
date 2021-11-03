import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { ProductPageActions, ProductApiActions } from './actions';
import { Product } from '../product';

export interface ProductState {
  showProductCode: boolean;
  currentProductId: number | null;
  products: Product[];
  error: unknown;
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
    on(ProductPageActions.showProductCode, (state: ProductState): ProductState => {
      return {
        ...state,
        showProductCode: true,
      };
    }),
    on(ProductPageActions.hideProductCode, (state: ProductState): ProductState => {
      return {
        ...state,
        showProductCode: false,
      };
    }),
    on(ProductPageActions.setCurrentProduct, (state: ProductState, action): ProductState => {
      return {
        ...state,
        currentProductId: action.id,
      };
    }),
    on(ProductPageActions.initCurrentProduct, (state: ProductState): ProductState => {
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
    on(ProductPageActions.clearCurrentProduct, (state: ProductState): ProductState => {
      return {
        ...state,
        currentProductId: null,
      };
    }),
    on(ProductApiActions.loadProductsSuccess, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: action.products,
        error: '',
      };
    }),
    on(ProductApiActions.loadProductsFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: [],
        error: action.error,
      };
    }),
    on(ProductApiActions.createProductSuccess, (state: ProductState, action): ProductState => {
      return {
        ...state,
        products: [
          ...state.products
            .filter((p: Product) => {
              return p.id > 0;
            }),
          action.product,
        ],
      };
    }),
    on(ProductApiActions.createProductFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }),
    on(ProductApiActions.updateProductsSuccess, (state: ProductState, action): ProductState => {
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
    on(ProductApiActions.updateProductsFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    }),
    on(ProductApiActions.deleteProductFailure, (state: ProductState, action): ProductState => {
      return {
        ...state,
        error: action.error,
      };
    })
  );

export function reducer(state: ProductState | undefined, action: Action) {
  return productListReducer(state, action);
}
