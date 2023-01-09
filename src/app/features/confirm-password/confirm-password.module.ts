import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmPasswordRoutingModule } from './confirm-password-routing.module';
import { ConfirmPasswordComponent } from './components/confirm-password/confirm-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [ConfirmPasswordComponent],
	imports: [
		CommonModule,
		ConfirmPasswordRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
	],
	exports: [ConfirmPasswordComponent],
})
export class ConfirmPasswordModule {}
