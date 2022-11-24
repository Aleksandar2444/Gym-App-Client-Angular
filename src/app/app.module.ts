import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { AuthService } from './services/auth.service';
import { HeaderComponent } from './components/navigation/header/header.component';
import { SidenavComponent } from './components/navigation/sidenav/sidenav.component';
import { HomeComponent } from './components/pages/home/home.component';
import { TrainingComponent } from './components/pages/training/training.component';

@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		HeaderComponent,
		SidenavComponent,
		HomeComponent,
		TrainingComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
	],
	providers: [AuthService],
	bootstrap: [AppComponent],
})
export class AppModule {}
