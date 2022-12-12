import { LoggedInUser } from './auth.user.models';

export enum AuthStatus {
	PENDING = 'pending',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface AuthState {
	user: LoggedInUser | null;
	error: string | null;
	status: AuthStatus;
	message: string | null;
	isAuth: boolean;
}

export const initialState: AuthState = {
	user: null,
	error: null,
	status: AuthStatus.PENDING,
	message: null,
	isAuth: false,
};
