import { RegisterUserData } from '@@shared/store/auth/models/auth.user.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class RegisterUserService {
	private readonly registerUserURL = `${API_URL}/auth/register`;

	constructor(private readonly http: HttpClient) {}

	registerUser(
		firstName: string,
		lastName: string,
		email: string,
		password: string
	) {
		return this.http.post<RegisterUserData>(this.registerUserURL, {
			firstName,
			lastName,
			email,
			password,
		});
	}
}
