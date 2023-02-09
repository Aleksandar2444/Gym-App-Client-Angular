import { AuthService } from '@@shared/services/auth.service';
import { Injectable } from '@angular/core';
import {
	ActivatedRouteSnapshot,
	CanActivate,
	Router,
	RouterStateSnapshot,
	UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class AuthGuard implements CanActivate {
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
		const user = this.authService.getUserFromLocalStorage();

		if (!user) {
			this.router.navigate(['auth', 'login']);
			return false;
		}

		return true;
	}
}
