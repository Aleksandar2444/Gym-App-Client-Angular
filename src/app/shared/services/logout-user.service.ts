import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class LogoutUserService {
	private readonly logoutUserURL = `${API_URL}/auth/logout`;

	constructor(private readonly http: HttpClient) {}

	logoutUser() {
		return this.http.post(`${this.logoutUserURL}`, {});
	}
}
