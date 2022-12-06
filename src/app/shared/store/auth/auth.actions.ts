import { createAction, props } from '@ngrx/store';
import {
	LoggedInUser,
	RegisterUserData,
} from '@@shared/store/auth/models/auth.user.models';

// Action for login user
export const loginRequest = createAction(
	'[Auth] Login Request',
	props<{ payload: { email: string; password: string } }>()
);

// Action for login success
export const loginRequestSuccess = createAction(
	'[Auth] Login User Success',
	props<{ payload: LoggedInUser }>()
);

// Error login action
export const loginError = createAction(
	'[Auth] Login Error',
	props<{ payload: any }>()
);

// Action for logout user
export const logoutRequest = createAction(
	'[Auth] Logout User',
	props<{ payload: any }>()
);

// Error login action
export const logoutError = createAction(
	'[Auth] Logout Error',
	props<{ payload: any }>()
);

// Action for register user
export const registerRequest = createAction(
	'[Auth] Register Request',
	props<{ payload: { email: string; password: string } }>()
);

// Action for register success
export const registerRequestSuccess = createAction(
	'[Auth] Register User Success',
	props<{ payload: RegisterUserData }>()
);

// Error register action
export const registerError = createAction(
	'[Auth] Register Error',
	props<{ payload: any }>()
);
