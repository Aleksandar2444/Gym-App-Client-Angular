export interface User {
	_id: string;
	email: string;
	message: string;
	isAuth: boolean;
	refreshToken?: string;
}
export interface LoggedInUser {
	_id: string;
	email: string;
	password?: string;
	isAuth: boolean;
	refreshToken?: string;
	message: string;
}

export interface RegisterUserData {
	email: string;
	password: string;
	message: string;
}
