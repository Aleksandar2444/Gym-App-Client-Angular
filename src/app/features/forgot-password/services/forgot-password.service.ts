import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ForgotPasswordRequestBody } from '../models/model';

const { API_URL } = environment;

@Injectable()
export class ForgotPasswordService {
	private readonly forgotPasswordURL = `${API_URL}/auth/forgot-password`;

	constructor(private readonly http: HttpClient) {}

	forgotPassword(email: string): Observable<ForgotPasswordRequestBody> {
		return this.http.post<ForgotPasswordRequestBody>(
			`${this.forgotPasswordURL}`,
			{
				email,
			}
		);
	}
}
