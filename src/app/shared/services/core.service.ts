import { UserDataResponse } from '@@features/user-profile/models/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

	findUserById(): Observable<UserDataResponse> {
		const { user } = this.authService.getUserFromLocalStorage();

		return this.http.get<UserDataResponse>(
			`${this.findUserByIdURL}/${encodeURIComponent(user._id)}`
		);
	}
}
