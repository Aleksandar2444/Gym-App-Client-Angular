import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

const { API_URL } = environment;

@Injectable()
export class CoreService {
	private readonly findUserByIdURL = `${API_URL}/auth/user`;

	constructor(private readonly http: HttpClient) {}

	findUserById(userId: string) {
		return this.http.get(`${this.findUserByIdURL}/${userId}`);
	}
}
