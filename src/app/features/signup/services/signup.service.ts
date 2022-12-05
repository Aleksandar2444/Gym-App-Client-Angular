import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'src/app/shared/user/user';

@Injectable()
export class SignupService {
	authChange = new Subject<boolean>();
	user: User;

	constructor() {}

	registerUser(registerUser: User) {
		this.user = {
			email: registerUser.email,
			password: registerUser.password,
		};
		this.authChange.next(true);
	}
}
