import { resetPasswordRequest } from '@@shared/store/auth/auth.actions';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { zxcvbn } from '@zxcvbn-ts/core';
import { passwordValidator } from '@@shared/zxcvbnmValidator/zxcvbnmValidator';

@Component({
	selector: 'app-confirm-password',
	templateUrl: './confirm-password.component.html',
	styleUrls: ['./confirm-password.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmPasswordComponent {
	confirmPasswordForm: FormGroup;
	showDetails: boolean;
	isFormSubmitted = false;
	passwordMeter = '0';
	scores: Record<string, string> = {
		'0': '0',
		'1': '25',
		'2': '50',
		'3': '75',
		'4': '100',
	};

	constructor(
		private readonly store: Store,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {}

	ngOnInit() {
		this.initForm();
	}

	onStrengthChanged(strength: number) {
		this.showDetails = true;
	}

	initForm() {
		this.confirmPasswordForm = new FormGroup({
			password: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(
					/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/
				),
				passwordValidator,
			]),
			confirmPassword: new FormControl<string>('', Validators.required),
		});
	}

	//* Checking on input typing value
	// change(event: any) {
	// 	let passwordScore = zxcvbn(event.target.value);
	// 	let score = String(passwordScore.score);
	// 	this.passwordMeter = this.scores[score];
	// }

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.confirmPasswordForm.invalid) return;
		//* taking the token from the url
		const resetToken = this.route.snapshot.params.resetPasswordToken;

		const resetPasswordValues = this.confirmPasswordForm.value;

		this.store.dispatch(
			resetPasswordRequest({
				payload: {
					password: resetPasswordValues,
					resetPasswordToken: resetToken,
				},
			})
		);

		if (this.confirmPasswordForm.valid) {
			this.router.navigate(['auth', 'login']);
		}
	}
}
