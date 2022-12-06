import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/models/auth.store.models';

export interface AppState {
	user: AuthState;
}

export const appReducer: ActionReducerMap<AppState> = {
	user: authReducer,
};
