import { UserState } from '../user/state/user.reducer';

// Global app state
// Extended in lazy loaded modules, which is Products module. Is it needed in ngrx 12?
export interface State {
  users: UserState;
}
