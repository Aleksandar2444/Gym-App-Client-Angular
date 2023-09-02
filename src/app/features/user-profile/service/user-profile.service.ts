import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Country, UserDataResponse } from '../models/model';

const { API_URL } = environment;

@Injectable()
export class UserProfileService {
	private readonly userProfileInfoURL = `${API_URL}/user-profile`;
	private readonly countriesURL = `${API_URL}/countries`;

	constructor(private readonly http: HttpClient) {}

	updateUserProfile(
		userId: string,
		gymNickname: string,
		country: string,
		city: string,
		about: string
	): Observable<UserDataResponse> {
		return this.http.patch<UserDataResponse>(
			`${this.userProfileInfoURL}/edit/${encodeURIComponent(userId)}`,
			{
				gymNickname,
				country,
				city,
				about,
			}
		);
	}

	getAllCountries(): Observable<Country> {
		return this.http.get<Country>(this.countriesURL);
	}
}
