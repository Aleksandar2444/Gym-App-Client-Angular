import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment.prod';
import { LoggedInUser } from '@@shared/store/auth/models/auth.user.models';

const { API_URL } = environment;

@Injectable()
export class AuthService {
	constructor(private readonly http: HttpClient) {}

	loginUser(email: string, password: string) {
		return this.http.post(`${API_URL}/auth/login`, { email, password });
	}

	registerUser(email: string, password: string) {
		return this.http.post(`${API_URL}/auth/register`, { email, password });
	}

	logoutUser(user: LoggedInUser) {
		return this.http.post(`${API_URL}/auth/logout`, { user });
	}
}
