import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/user/user';

@Injectable()
export class LoginService {
	authChange = new Subject<boolean>();
	user: User | null;

	constructor() {}

	loginUser(email: string, password: string) {
		this.user = {
			email,
			password,
		};
		this.authChange.next(true);
	}
	logoutUser() {
		this.user = null;
		this.authChange.next(false);
	}
	isAuth() {
		return this.user != null;
	}
}
