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
	email: string;
	password: string;
	message: string;
}
