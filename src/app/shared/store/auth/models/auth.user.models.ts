export interface User {
	_id: string;
	userName: string;
	email: string;
	isAuth: boolean;
	token: string;
	message: string;
}

export interface LoggedInUser {
	_id: string;
	userName: string;
	email: string;
	isAuth: boolean;
	token: string;
	message: string;
}

export interface RegisterUserData {
	userName: string;
	email: string;
	password: string;
	message: string;
}

export interface Password {
	password: string;
}
