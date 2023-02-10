export interface User {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	isAuth: boolean;
	userLoggedInToken: string;
	message: string;
}

export interface LoggedInUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	isAuth: boolean;
	userLoggedInToken: string;
	message: string;
}

export interface RegisterUserData {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	message: string;
}

export interface RegisterUserRequestBody {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}
