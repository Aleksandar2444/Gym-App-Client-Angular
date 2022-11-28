import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SignupComponent } from './features/signup/components/signup/signup.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { MaterialModule } from './shared/material/material.module';
import { LoginService } from './features/login/services/login.service';
import { SignupService } from './features/signup/services/signup.service';
import { HeaderComponent } from './shared/header/components/header/header.component';
import { SidenavComponent } from './shared/sidenav/components/sidenav/sidenav.component';
import { HomeComponent } from './features/home/components/home/home.component';
import { TrainingComponent } from './features/training/components/training/training.component';

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
	providers: [LoginService, SignupService],
	bootstrap: [AppComponent],
})
export class AppModule {}
