import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@@shared/services/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		// 1. Guarding against login and register routes
		if (request.url.includes('login') || request.url.includes('signup')) {
			return next.handle(request);
		}

		const user = this.authService.getUserFromLocalStorage();

		// 2. Checking if user is logged in
		if (!user) return next.handle(request);

		// 3. Cloning request with new header
		const clonedRequest = request.clone({
			setHeaders: {
				Authorization: `Bearer ${user.userLoggedInToken}`,
			},
		});

		return next.handle(clonedRequest);
	}
}
