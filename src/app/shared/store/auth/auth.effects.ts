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

@Injectable()
export class AuthEffects {
	constructor(
		private readonly actions$: Actions,
		private readonly authService: AuthService,
		private readonly notificationService: NotificationService
	) {}

	notificationSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(loginRequestSuccess, registerRequestSuccess),
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
					.registerUser(action.payload.email, action.payload.password)
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
					this.notificationService.showSuccess(
						'Logged out successfully!'
					);
					return this.authService.logoutUser(action.payload);
				}),
				catchError((error) => {
					this.notificationService.showError('Something went wrong.');
					return of(logoutError({ payload: error }));
				})
			),
		{ dispatch: false }
	);
}
