import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { AuthService } from '@@shared/services/auth.service';
import {
	loginRequest,
	loginRequestSuccess,
	loginError,
	registerRequest,
	registerRequestSuccess,
	registerError,
	logoutRequest,
	logoutError,
} from '@@shared/store/auth/auth.actions';
import {
	RegisterUserData,
	User,
} from '@@shared/store/auth/models/auth.user.models';
import { NotificationService } from '@@shared/services/notification.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly notificationService: NotificationService,
		private readonly router: Router
	) {}

	loginRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(loginRequest),
			switchMap((action) => {
				return this.authService
					.loginUser(action.payload.email, action.payload.password)
					.pipe(
						map((user) => {
							const loggedInUserApi = {
								...(user as User),
								isAuth: true,
							};

							return loginRequestSuccess({
								payload: loggedInUserApi,
							});
						}),
						tap((action) => {
							if (this.router.url.includes('login')) {
								this.router.navigate(['home']);
							}
							localStorage.setItem(
								'user',
								JSON.stringify(action.payload)
							);
						}),

						catchError((error) => {
							return of(loginError({ payload: error }));
						})
					);
			})
		)
	);

	registerRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(registerRequest),
			switchMap((action) => {
				return this.authService
					.registerUser(
						action.payload.userName,
						action.payload.email,
						action.payload.password
					)
					.pipe(
						map((user) => {
							const registerUserApi = {
								...(user as RegisterUserData),
							};

							return registerRequestSuccess({
								payload: registerUserApi,
							});
						}),
						catchError((error) => {
							return of(registerError({ payload: error }));
						})
					);
			})
		)
	);

	logoutRequest$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(logoutRequest),
				tap((action) => {
					localStorage.removeItem('user');

					return this.authService.logoutUser();
				}),
				catchError((error) => {
					this.notificationService.showError('Something went wrong.');
					return of(logoutError({ payload: error }));
				})
			),
		{ dispatch: false }
	);

	loginSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginRequestSuccess),
				tap({
					next: (message) => {
						this.notificationService.showSuccess(
							message.payload.message
						);
					},
				})
			),
		{ dispatch: false }
	);

	registerSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(registerRequestSuccess),
				tap({
					next: (message) => {
						this.notificationService.showSuccess(
							message.payload.message
						);
						this.router.navigate(['auth', 'login']);
					},
				})
			),
		{ dispatch: false }
	);

	logoutSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(logoutRequest),
				tap({
					next: () => {
						this.notificationService.showSuccess(
							'Logged out successfully!'
						);

						this.router.navigate(['auth', 'login']);
					},
				})
			),
		{ dispatch: false }
	);

	notificationErrorMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginError, registerError),
				tap((action) => {
					if (action.type === '[Auth] Login Error') {
						this.notificationService.showError(
							action.payload.error
						);
					}
					if (action.type === '[Auth] Register Error') {
						this.notificationService.showError(
							action.payload.error.message
						);
					}
				})
			),
		{ dispatch: false }
	);
}
