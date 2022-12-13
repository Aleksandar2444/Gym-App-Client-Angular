import { LoggedInUser } from './auth.user.models';

export enum AuthStatus {
	PENDING = 'pending',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface AuthState {
	refreshToken?: string | null;
	user: LoggedInUser | null;
	error: string | null;
	status: AuthStatus;
	message: string | null;
	isAuth: boolean;
}

export const initialState: AuthState = {
	refreshToken: null,
	user: null,
	error: null,
	status: AuthStatus.PENDING,
	message: null,
	isAuth: false,
};
