import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from '@@features/signup/components/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SignupService } from './services/signup.service';

@NgModule({
	declarations: [SignupComponent],
	imports: [
		CommonModule,
		SignupRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
	],
	providers: [SignupService],
	exports: [SignupComponent],
})
export class SignupModule {}
