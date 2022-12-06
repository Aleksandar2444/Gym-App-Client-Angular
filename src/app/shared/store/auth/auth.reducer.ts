import {
	createFeatureSelector,
	createReducer,
	createSelector,
	on,
} from '@ngrx/store';
import {
	loginRequest,
	loginRequestSuccess,
	loginError,
	registerRequest,
	registerRequestSuccess,
	registerError,
	logoutRequest,
} from './auth.actions';
import {
	initialState,
	AuthStatus,
	AuthState,
} from '@@shared/store/auth/models/auth.store.models';

export const authReducer = createReducer(
	initialState,
	on(loginRequest, (state) => ({ ...state, status: AuthStatus.LOADING })),
	on(loginRequestSuccess, (state, { payload }) => ({
		...state,
		refreshToken: payload.refreshToken,
		error: null,
		user: payload,
		status: AuthStatus.SUCCESS,
		message: payload.message,
		isAuth: true,
	})),
	on(loginError, (state, { payload }) => ({
		...state,
		refreshToken: null,
		user: null,
		error: payload,
		status: AuthStatus.ERROR,
		message: payload,
		isAuth: false,
	})),
	on(logoutRequest, (state, { payload }) => ({
		user: payload,
		error: payload,
		status: AuthStatus.SUCCESS,
		message: 'Logged out successfully!',
		isAuth: false,
	})),
	on(registerRequest, (state) => ({ ...state, status: AuthStatus.LOADING })),
	on(registerRequestSuccess, (state, { payload }) => ({
		...state,
		error: null,
		status: AuthStatus.SUCCESS,
		message: payload.message,
	})),
	on(registerError, (state, { payload }) => ({
		...state,
		error: payload,
		status: AuthStatus.ERROR,
		message: payload,
	}))
);

// ('auth') key defined in app.module
export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(selectAuthState, (state) => {
	return state.user?.isAuth;
});
