import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { RegisterUser } from '../interfaces/registerUser';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	authChange = new Subject<boolean>();
	private user: User | null;
	constructor(private router: Router) {}

	registerUser(registerUser: RegisterUser) {
		this.user = {
			email: registerUser.email,
			password: registerUser.password,
		};
		this.authChange.next(true);
		this.router.navigate(['/']);
	}

	loginUser(email: string, password: string) {
		this.user = {
			email,
			password,
		};
		this.authChange.next(true);
		this.router.navigate(['/']);
	}

	logoutUser() {
		this.user = null;
		this.authChange.next(false);
		this.router.navigate(['/login']);
	}

	isAuth() {
		return this.user != null;
	}
}
