import {
	ForgotPasswordForm,
	ForgotPasswordRequestBody,
} from '@@features/forgot-password/models/model';
import { ForgotPasswordService } from '@@features/forgot-password/services/forgot-password.service';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { AuthService } from '@@shared/services/auth.service';
import { NotificationService } from '@@shared/services/notification.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
	forgotPasswordForm: FormGroup<ForgotPasswordForm>;
	isFormSubmitted = false;

	constructor(
		private readonly forgotPasswordService: ForgotPasswordService,
		private readonly router: Router,
		private readonly notificationService: NotificationService,
		private readonly authService: AuthService
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();
	}

	initForm(): void {
		this.forgotPasswordForm = new FormGroup<ForgotPasswordForm>({
			email: new FormControl('', {
				validators: [Validators.required, Validators.email],
				nonNullable: true,
			}),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.forgotPasswordForm.invalid) return;

		const { email } = { ...this.forgotPasswordForm.value };
		if (!email) return;

		this.forgotPasswordService
			.forgotPassword(email)
			.pipe(
				takeUntil(this.destroy$),
				tap((value: ForgotPasswordRequestBody) => {
					if (!value) {
						this.notificationService.showError(
							'Something went wrong, try again'
						);

						this.router.navigate(['auth', 'forgot-password']);
					}

					if (email) {
						this.authService.saveEmailToLocalStorage(email);

						this.router.navigate([
							'auth',
							'forgot-password',
							'email-sent',
						]);
					}
				})
			)
			.subscribe();
	}
}
