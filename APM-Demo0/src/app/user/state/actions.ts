import { createAction } from '@ngrx/store';

export const unmaskUserName = createAction('[User] Unmask user name');

export const maskUserName = createAction('[User] Mask user name');
