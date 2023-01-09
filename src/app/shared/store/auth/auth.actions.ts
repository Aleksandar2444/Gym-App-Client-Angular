import { createAction, props } from '@ngrx/store';
import {
	Password,
	RegisterUserData,
	User,
} from '@@shared/store/auth/models/auth.user.models';

// Login user action
export const loginRequest = createAction(
	'[Auth] Login Request',
	props<{ payload: { email: string; password: string } }>()
);

// Login success action
export const loginRequestSuccess = createAction(
	'[Auth] Login User Success',
	props<{ payload: User }>()
);

// Login error action
export const loginError = createAction(
	'[Auth] Login Error',
	props<{ payload: any }>()
);

// Logout user action
export const logoutRequest = createAction(
	'[Auth] Logout User',
	props<{ payload: any }>()
);

// Login error action
export const logoutError = createAction(
	'[Auth] Logout Error',
	props<{ payload: any }>()
);

// Register user action
export const registerRequest = createAction(
	'[Auth] Register Request',
	props<{ payload: { userName: string; email: string; password: string } }>()
);

// Register user success action
export const registerRequestSuccess = createAction(
	'[Auth] Register User Success',
	props<{ payload: RegisterUserData }>()
);

// Register error action
export const registerError = createAction(
	'[Auth] Register Error',
	props<{ payload: any }>()
);

// Forgot password action
export const forgotPasswordRequest = createAction(
	'[Auth] Forgot Password Request',
	props<{ payload: { email: string } }>()
);

// Forgot password action
export const forgotPasswordSuccess = createAction(
	'[Auth] Forgot Password Success',
	props<{ payload: any }>()
);

// Forgot password error action
export const forgotPasswordError = createAction(
	'[Auth] Forgot Password Error',
	props<{ payload: any }>()
);

// Reset password action
export const resetPasswordRequest = createAction(
	'[Auth] Reset Password Request',
	props<{ payload: { token: string; password: string } }>()
);

// Reset password action
export const resetPasswordSuccess = createAction(
	'[Auth] Reset Password Success',
	props<{ payload: Password }>()
);

// Reset password error action
export const resetPasswordError = createAction(
	'[Auth] Reset Password Error',
	props<{ payload: any }>()
);
