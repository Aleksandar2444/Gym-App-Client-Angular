import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordRoutingModule } from './forgot-password-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ForgotPasswordService } from './services/forgot-password.service';

@NgModule({
	declarations: [ForgotPasswordComponent, EmailSentComponent],
	imports: [
		CommonModule,
		ForgotPasswordRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
	],
	providers: [ForgotPasswordService],
	exports: [ForgotPasswordComponent, EmailSentComponent],
})
export class ForgotPasswordModule {}
