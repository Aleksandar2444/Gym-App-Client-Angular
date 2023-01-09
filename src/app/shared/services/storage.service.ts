import {
	loginRequestSuccess,
	logoutRequest,
} from '@@shared/store/auth/auth.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import jwt_decode from 'jwt-decode';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor(private readonly store: Store) {
		const user = this.getUserFromStorage();

		if (user) {
			this.store.dispatch(loginRequestSuccess({ payload: user }));
		}

		this.getTokenExpirationDate();
	}

	getUserFromStorage() {
		const user = localStorage.getItem('user');

		if (user) {
			return JSON.parse(user);
		}

		return null;
	}

	getTokenExpirationDate() {
		const user = this.getUserFromStorage();

		if (user) {
			const decodedToken: any = jwt_decode(user.token);

			const expirationDate = new Date(
				JSON.parse(decodedToken.exp) * 1000
			);

			const timeout = expirationDate.getTime() - Date.now();

			return setTimeout(
				() => this.store.dispatch(logoutRequest({ payload: null })),
				timeout
			);
		}

		return user;
	}
}
