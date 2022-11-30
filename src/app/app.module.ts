import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from '@@shared/material/material.module';
import { StopTrainingComponent } from '@@features/training/components/stop-training/stop-training.component';
import { TrainingModule } from '@@features/training/training.module';
import { SignupModule } from '@@features/signup/signup.module';
import { LoginModule } from '@@features/login/login.module';
import { SidenavModule } from '@@shared/sidenav/sidenav.module';
import { HeaderModule } from '@@shared/header/header.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		TrainingModule,
		SignupModule,
		LoginModule,
		SidenavModule,
		HeaderModule,
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
	entryComponents: [StopTrainingComponent],
})
export class AppModule {}
