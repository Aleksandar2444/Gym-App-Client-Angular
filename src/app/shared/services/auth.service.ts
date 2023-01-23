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
		return this.http.post(this.loginUserURL, { email, password });
	}

	saveUserToLocalStorage(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	removeUserFromLocalStorage() {
		localStorage.removeItem('user');
	}
}
