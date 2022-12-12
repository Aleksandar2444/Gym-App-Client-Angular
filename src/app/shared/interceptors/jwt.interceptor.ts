import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpClient,
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	t = '';
	constructor(private readonly http: HttpClient) {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		// 1. Guarding against login and register routes
		if (request.url.includes('login') || request.url.includes('signup')) {
			return next.handle(request);
		}
		// const refreshToken = localStorage.getItem('refresh-token');
		const token = localStorage.getItem('token');

		// 2. Checking if user is logged in
		if (!token) return next.handle(request);

		// 3. Cloning request with new header
		const clonedRequest = request.clone({
			setHeaders: {
				Authorization: `Bearer ${token}`,
			},
		});

		return next.handle(clonedRequest);
	}
}
