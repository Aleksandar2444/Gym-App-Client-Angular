import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@@shared/guards/auth.guard';

const routes: Routes = [
	{
		path: 'auth/login',
		loadChildren: () =>
			import('./features/login/login.module').then(
				(module) => module.LoginModule
			),
	},
	{
		path: 'auth/signup',
		loadChildren: () =>
			import('./features/signup/signup.module').then(
				(module) => module.SignupModule
			),
	},
	{
		path: 'auth/forgot-password',
		loadChildren: () =>
			import('./features/reset-password/reset-password.module').then(
				(module) => module.ResetPasswordModule
			),
	},
	{
		path: 'auth/reset-password/:token',
		loadChildren: () =>
			import('./features/confirm-password/confirm-password.module').then(
				(module) => module.ConfirmPasswordModule
			),
	},
	{
		path: 'home',
		loadChildren: () =>
			import('./features/home/home.module').then(
				(module) => module.HomeModule
			),
		canActivate: [AuthGuard],
	},
	{
		path: 'training',
		loadChildren: () =>
			import('./features/training/training.module').then(
				(module) => module.TrainingModule
			),
		canActivate: [AuthGuard],
	},
];

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		RouterModule.forRoot(routes, {
			initialNavigation: 'enabledBlocking',
		}),
	],
	exports: [RouterModule],
})
export class AppRoutingModule {}
