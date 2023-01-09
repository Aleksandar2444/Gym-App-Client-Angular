import { forgotPasswordRequest } from '@@shared/store/auth/auth.actions';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {
	resetPasswordForm: FormGroup;
	isFormSubmitted = false;

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.resetPasswordForm = new FormGroup({
			email: new FormControl<string>('', [
				Validators.required,
				Validators.email,
			]),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.resetPasswordForm.invalid) return;
		const email = { ...this.resetPasswordForm.value };
		this.store.dispatch(forgotPasswordRequest({ payload: email }));
		this.resetPasswordForm.reset();
	}
}
