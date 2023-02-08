import { UserInfo } from '@@shared/store/auth/models/auth.user.models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

const { API_URL } = environment;

@Injectable()
export class CoreService {
	private readonly findUserByIdURL = `${API_URL}/auth/user`;

	constructor(
		private readonly http: HttpClient,
		private readonly authService: AuthService
	) {}

	findUserById() {
		const { userLoggedInToken, user } =
			this.authService.getUserFromLocalStorage();

		const headers = new HttpHeaders().set(
			'Authorization',
			`Bearer ${userLoggedInToken}`
		);

		return this.http.get<UserInfo>(`${this.findUserByIdURL}/${user._id}`, {
			headers,
		});
	}
}
