import { AuthService } from '@@shared/services/auth.service';
import { LoggedInUser } from '@@shared/store/auth/models/auth.user.models';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
	// user: LoggedInUser;
	constructor(
		private readonly router: Router,
		private readonly authService: AuthService
	) {}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	):
		| Observable<boolean | UrlTree>
		| Promise<boolean | UrlTree>
		| boolean
		| UrlTree {
		const token = localStorage.getItem('token');

		if (!token) {
			this.router.navigate(['auth', 'login']);
			return false;
		}

		return true;
		// return this.checkLoginUser();
	}

	// checkLoginUser(): Observable<boolean> {
	// 	const userId = localStorage.getItem('userId');
	// 	return this.authService.findUserById(userId!).pipe(
	// 		map((user) => {
	// 			if (!user) {
	// 				this.router.navigate(['auth', 'login']);
	// 				return false;
	// 			}
	// 			return true;
	// 		})
	// 	);
	// }
}
