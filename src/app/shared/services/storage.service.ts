import { loginRequestSuccess } from '@@shared/store/auth/auth.actions';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

@Injectable({
	providedIn: 'root',
})
export class StorageService {
	constructor(private readonly store: Store) {
		const user = this.getUserFromStorage();

		if (user) {
			this.store.dispatch(loginRequestSuccess({ payload: user }));
		}
	}

	getUserFromStorage() {
		const user = localStorage.getItem('user');

		if (user) {
			return JSON.parse(user);
		}
		return null;
	}
}
