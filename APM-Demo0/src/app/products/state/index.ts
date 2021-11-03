import * as fromAppState from '../../state/app.state';
import { ProductState } from './product-list.reducer';

export { reducer } from './product-list.reducer';
export * from './product-list.selectors';

export interface State extends fromAppState.State {
  products: ProductState;
}