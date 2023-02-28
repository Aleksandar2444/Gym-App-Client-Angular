import { createReducer, on } from '@ngrx/store';
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
} from '@@shared/store/auth/models/auth.store.models';

export const authReducer = createReducer(
	initialState,
	// Login
	on(loginRequest, (state) => ({ ...state, status: AuthStatus.LOADING })),
	on(loginRequestSuccess, (state, { payload }) => ({
		...state,
		error: null,
		user: payload,
		status: AuthStatus.SUCCESS,
		message: payload.message,
		isAuth: true,
	})),
	on(loginError, (state, { payload }) => ({
		...state,
		user: null,
		error: payload,
		status: AuthStatus.ERROR,
		message: payload,
		isAuth: false,
	})),
	// Logout
	on(logoutRequest, (state, { payload }) => ({
		user: payload,
		error: payload,
		status: AuthStatus.SUCCESS,
		message: 'Logged out successfully!',
		isAuth: false,
	})),
	// Register
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
