import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from '../components/auth/signup/signup.component';
import { LoginComponent } from '../components/auth/login/login.component';
import { HomeComponent } from '../components/pages/home/home.component';
import { TrainingComponent } from '../components/pages/training/training.component';

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
