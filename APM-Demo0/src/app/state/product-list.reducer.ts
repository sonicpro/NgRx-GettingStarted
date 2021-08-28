import { createReducer, ActionReducer, Action, on } from '@ngrx/store';
import { showProductCode, hideProductCode } from './actions';

const initialState: boolean = false;

const productListReducer = createReducer(
  initialState,
  on(showProductCode, state => true),
  on(hideProductCode, state => false),
)

export function reducer(state: boolean | undefined, action: Action) {
  return productListReducer(state, action);
}
