import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

const routes: Routes = [
	{ path: '', component: ResetPasswordComponent },
	{
		path: 'email-sent',
		component: EmailSentComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ResetPasswordRoutingModule {}
