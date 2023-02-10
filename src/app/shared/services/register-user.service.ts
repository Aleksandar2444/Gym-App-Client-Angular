import { RegisterUserRequestBody } from '@@shared/store/auth/models/auth.user.models';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
	): Observable<RegisterUserRequestBody> {
		return this.http.post<RegisterUserRequestBody>(this.registerUserURL, {
			firstName,
			lastName,
			email,
			password,
		});
	}
}
