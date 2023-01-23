import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

const routes: Routes = [
	{ path: '', component: ForgotPasswordComponent },
	{ path: 'email-sent', component: EmailSentComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ForgotPasswordRoutingModule {}
