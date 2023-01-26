import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ResetPasswordService } from './services/reset-password.service';

@NgModule({
	declarations: [ResetPasswordComponent],
	imports: [
		CommonModule,
		ResetPasswordRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
	],
	providers: [ResetPasswordService],
	exports: [ResetPasswordComponent],
})
export class ResetPasswordModule {}
