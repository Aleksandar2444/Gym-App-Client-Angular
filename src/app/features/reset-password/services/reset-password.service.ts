import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ResetPasswordResponse } from '../models/model';

const { API_URL } = environment;

@Injectable()
export class ResetPasswordService {
	private readonly resetPasswordURL = `${API_URL}/auth/reset-password`;

	constructor(private readonly http: HttpClient) {}

	resetPassword(
		resetPasswordToken: string,
		password: string
	): Observable<ResetPasswordResponse> {
		return this.http.post<ResetPasswordResponse>(
			`${this.resetPasswordURL}/${resetPasswordToken}`,
			{
				password,
				resetPasswordToken,
			}
		);
	}
}
