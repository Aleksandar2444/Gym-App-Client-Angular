export interface User {
	_id: string;
	email: string;
	message: string;
	isAuth: boolean;
	token?: string;
	refreshToken?: string;
}

export interface LoggedInUser {
	_id: string;
	email: string;
	password?: string;
	isAuth: boolean;
	token?: string;
	refreshToken: string;
	message: string;
}

export interface RegisterUserData {
	email: string;
	password: string;
	message: string;
}
