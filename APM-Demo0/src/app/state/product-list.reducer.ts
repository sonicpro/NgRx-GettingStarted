import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { showProductCode, hideProductCode } from './actions';

// export const PRODUCT_LIST_FEATURE_KEY = 'product list';

export interface AppState {
  showProductCode: boolean;
}

const initialState: AppState = { showProductCode: false };

export const productListReducer: ActionReducer<AppState, Action> = createReducer(
  initialState,
  on(showProductCode, (state: AppState, action: Action) => ({ showProductCode: true })),
  on(hideProductCode, (state: AppState, action: Action) => ({ showProductCode: false })),
)

export function reducer(state: AppState | undefined, action: Action) {
  return productListReducer(state, action);
}
