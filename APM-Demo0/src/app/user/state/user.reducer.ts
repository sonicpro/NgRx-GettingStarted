import { ActionReducer, Action, createReducer, on } from '@ngrx/store';
import { unmaskUserName, maskUserName } from './actions';

export const USER_FEATURE_KEY = "user";

export interface UserState {
  maskUserName: boolean;
}

const initialState: UserState = {
  maskUserName: true
};

const userReducer: ActionReducer<UserState, Action> = createReducer(
  initialState,
  on(maskUserName, (state) => ({ ...state, maskUserName: true })),
  on(unmaskUserName, (state) => ({ ...state, maskUserName: false })),
)

export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
