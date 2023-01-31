import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { zxcvbnValidator } from '@@shared/zxcvbnValidator/zxcvbnValidator';
import { ResetPasswordService } from '@@features/reset-password/services/reset-password.service';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ResetPassword } from '@@shared/store/auth/models/auth.user.models';
import { NotificationService } from '@@shared/services/notification.service';

import { BaseComponent } from '@@shared/base-component/base/base.component';
import { ResetPasswordForm } from '@@features/reset-password/models/model';

@Component({
	selector: 'app-reset-password',
	templateUrl: './reset-password.component.html',
	styleUrls: ['./reset-password.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent extends BaseComponent implements OnInit {
	currentResetPassword$ = new BehaviorSubject<ResetPassword | null>(null);

	resetPasswordForm: FormGroup<ResetPasswordForm>;

	showDetails: boolean;
	isFormSubmitted = false;
	passwordMeter = '1';
	scores: Record<string, string> = {
		'0': '0',
		'1': '25',
		'2': '50',
		'3': '75',
		'4': '100',
	};

	constructor(
		private readonly router: Router,
		private readonly route: ActivatedRoute,
		private readonly resetPasswordService: ResetPasswordService,
		private readonly notificationService: NotificationService
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();
	}

	onStrengthChanged(strength: number) {
		this.showDetails = true;
	}

	initForm() {
		this.resetPasswordForm = new FormGroup<ResetPasswordForm>(
			{
				password: new FormControl<string>('', {
					validators: [
						Validators.required,
						Validators.minLength(8),
						Validators.pattern(
							/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/
						),
						zxcvbnValidator(1),
					],
					nonNullable: true,
				}),
				confirmPassword: new FormControl<string>('', {
					validators: [
						Validators.required,
						Validators.minLength(8),
						Validators.pattern(
							/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/
						),
					],
					nonNullable: true,
				}),
			},
			this.confirmPasswordValidator
		);
	}

	confirmPasswordValidator = (formGroup: any) => {
		if (
			formGroup.controls['password'].value !==
			formGroup.controls['confirmPassword'].value
		) {
			return { passwordMismatch: true };
		} else {
			return null;
		}
	};

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.resetPasswordForm.invalid) return;
		//* taking the token from the url
		const resetToken = this.route.snapshot.params.resetPasswordToken;

		const resetPasswordValues = this.resetPasswordForm.value.password;

		if (!resetPasswordValues) return;

		this.resetPasswordService
			.resetPassword(resetToken, resetPasswordValues)
			.pipe(
				map((value) => value as ResetPassword),
				tap((value) => {
					const { password, resetPasswordToken: resetToken } = value;

					const updateUser: ResetPassword = {
						password: password,
						resetPasswordToken: resetToken,
					};
					this.currentResetPassword$.next(updateUser);

					this.notificationService.showSuccess(
						'Password updated successfully'
					);
					this.router.navigate(['auth', 'login']);
				})
			)
			.subscribe();
	}
}
