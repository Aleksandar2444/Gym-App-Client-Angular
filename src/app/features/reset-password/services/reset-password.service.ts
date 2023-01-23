import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class ResetPasswordService {
	private readonly resetPasswordURL = `${API_URL}/auth/reset-password`;

	constructor(private readonly http: HttpClient) {}

	resetPassword(resetPasswordToken: string, password: string) {
		return this.http.post(
			`${this.resetPasswordURL}/${resetPasswordToken}`,
			{
				password,
				resetPasswordToken,
			}
		);
	}
}
