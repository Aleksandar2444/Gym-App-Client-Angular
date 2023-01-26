import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class RegisterUserService {
	private readonly registerUserURL = `${API_URL}/auth/register`;

	constructor(private readonly http: HttpClient) {}

	registerUser(userName: string, email: string, password: string) {
		return this.http.post(this.registerUserURL, {
			userName,
			email,
			password,
		});
	}
}
