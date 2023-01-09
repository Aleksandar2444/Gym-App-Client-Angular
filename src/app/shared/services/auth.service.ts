import { User } from '@@shared/store/auth/models/auth.user.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class AuthService {
	private readonly loginUserURL = `${API_URL}/auth/login`;
	private readonly registerUserURL = `${API_URL}/auth/register`;
	private readonly logoutUserURL = `${API_URL}/auth/logout`;
	private readonly findUserByIdURL = `${API_URL}/auth/user`;
	private readonly forgotPasswordURL = `${API_URL}/auth/forgot-password`;
	private readonly resetPasswordURL = `${API_URL}/auth/reset-password`;

	constructor(private readonly http: HttpClient) {}

	loginUser(email: string, password: string) {
		return this.http.post(this.loginUserURL, { email, password });
	}

	registerUser(userName: string, email: string, password: string) {
		return this.http.post(this.registerUserURL, {
			userName,
			email,
			password,
		});
	}

	logoutUser() {
		return this.http.post(this.logoutUserURL, {});
	}

	findUserById(userId: string) {
		return this.http.get(`${this.findUserByIdURL}/${userId}`);
	}

	forgotPassword(email: string) {
		return this.http.post(`${this.forgotPasswordURL}`, {
			email,
		});
	}

	resetPassword(token: string, password: string) {
		return this.http.post(`${this.resetPasswordURL}`, {
			password,
			token,
		});
	}

	saveUserToLocalStorage(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	removeUserFromLocalStorage() {
		localStorage.removeItem('user');
	}
}
