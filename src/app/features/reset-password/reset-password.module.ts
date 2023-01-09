import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResetPasswordRoutingModule } from './reset-password-routing.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EmailSentComponent } from './components/email-sent/email-sent.component';

@NgModule({
	declarations: [ResetPasswordComponent, EmailSentComponent],
	imports: [
		CommonModule,
		ResetPasswordRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
	],
	exports: [ResetPasswordComponent, EmailSentComponent],
})
export class ResetPasswordModule {}
