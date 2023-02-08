import { User } from '@@shared/store/auth/models/auth.user.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class AuthService {
	private readonly loginUserURL = `${API_URL}/auth/login`;

	constructor(private readonly http: HttpClient) {}

	loginUser(email: string, password: string) {
		return this.http.post<User>(this.loginUserURL, { email, password });
	}

	saveUserToLocalStorage(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	getUserFromLocalStorage() {
		const user = localStorage.getItem('user');

		if (!user) return;

		return JSON.parse(user);
	}

	removeUserFromLocalStorage() {
		localStorage.removeItem('user');
	}

	saveEmailToLocalStorage(email: string) {
		localStorage.setItem('email', JSON.stringify(email));
	}

	getEmailFromLocalStorage() {
		const email = localStorage.getItem('email');

		if (!email) return;

		return JSON.parse(email);
	}

	removeEmailFromLocalStorage() {
		localStorage.clear();
	}
}
