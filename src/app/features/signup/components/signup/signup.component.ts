import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { zxcvbn } from '@zxcvbn-ts/core';
import { Store } from '@ngrx/store';
import { registerRequest } from '@@shared/store/auth/auth.actions';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup;
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

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.initForm();
	}

	onStrengthChanged(strength: number) {
		this.showDetails = true;
	}

	initForm() {
		this.signupForm = new FormGroup({
			email: new FormControl<string>('', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl<string>('', [
				Validators.required,
				Validators.minLength(8),
				Validators.pattern(
					/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/
				),
			]),
		});
	}

	//* Checking on input typing value
	change(event: any) {
		let passwordScore = zxcvbn(event.target.value);
		let score = String(passwordScore.score);
		this.passwordMeter = this.scores[score];
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.signupForm.invalid) return;
		zxcvbn(this.signupForm.controls.password.value);
		const registerUserValues = { ...this.signupForm.value };
		this.store.dispatch(registerRequest({ payload: registerUserValues }));
		this.signupForm.reset();
	}
}
