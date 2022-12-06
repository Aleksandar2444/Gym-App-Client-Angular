import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () =>
			import('./features/home/home.module').then(
				(module) => module.HomeModule
			),
	},
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
		path: 'training',
		loadChildren: () =>
			import('./features/training/training.module').then(
				(module) => module.TrainingModule
			),
	},
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
