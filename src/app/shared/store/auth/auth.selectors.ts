import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './models/auth.store.models';

// ('auth') key defined in app.module
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectIsUserAuth = createSelector(selectAuthState, (state) => {
	return state.user?.isAuth;
});

export const selectUser = createSelector(selectAuthState, (state) => {
	return state.user;
});

export const selectToken = createSelector(selectAuthState, (state) => {
	return state.user?.userLoggedInToken;
});
