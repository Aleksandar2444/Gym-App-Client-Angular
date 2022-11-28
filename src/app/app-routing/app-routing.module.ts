import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../features/home/components/home/home.component';
import { TrainingComponent } from '../features/training/components/training/training.component';
import { LoginComponent } from '../features/login/components/login/login.component';
import { SignupComponent } from '../features/signup/components/signup/signup.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'training', component: TrainingComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
];

@NgModule({
	declarations: [],
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
