import { createSelector, createFeatureSelector } from '@ngrx/store';
import { State } from '../../state/app.state';
import { UserState } from './user.reducer';

export const USER_FEATURE_KEY = "users";

export const selectUsers = createFeatureSelector<State, UserState>(USER_FEATURE_KEY);

export const selectMaskUserName = createSelector(
  selectUsers,
  (usersState: UserState) => usersState.maskUserName
)
