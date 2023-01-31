import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class ForgotPasswordService {
	private readonly forgotPasswordURL = `${API_URL}/auth/forgot-password`;

	constructor(private readonly http: HttpClient) {}

	forgotPassword(email: string) {
		return this.http.post(
			`${this.forgotPasswordURL}`,
			{
				email,
			},
			{ responseType: 'text' }
		);
	}
}
