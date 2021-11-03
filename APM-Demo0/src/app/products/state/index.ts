import * as fromAppState from '../../state/app.state';
import { ProductState } from './product.reducer';

export { reducer } from './product.reducer';
export * from './product.selectors';

export interface State extends fromAppState.State {
  products: ProductState;
}

export { ProductPageActions } from './actions';