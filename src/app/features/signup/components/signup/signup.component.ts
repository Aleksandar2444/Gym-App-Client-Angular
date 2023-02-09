import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { zxcvbn } from '@zxcvbn-ts/core';
import { Store } from '@ngrx/store';
import { registerRequest } from '@@shared/store/auth/auth.actions';
import { SignupForm } from '@@features/signup/models/model';
import { validatorsArray } from '@@shared/store/auth/models/validator.model';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
	signupForm: FormGroup<SignupForm>;

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
		this.signupForm = new FormGroup<SignupForm>({
			firstName: new FormControl<string>('', {
				validators: [Validators.required, Validators.minLength(2)],
				nonNullable: true,
			}),
			lastName: new FormControl<string>('', {
				validators: [Validators.required, Validators.minLength(2)],
				nonNullable: true,
			}),
			email: new FormControl<string>('', {
				validators: [Validators.required, Validators.email],
				nonNullable: true,
			}),
			password: new FormControl<string>('', {
				validators: validatorsArray,
				nonNullable: true,
			}),
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

		const { firstName, lastName, email, password } = {
			...this.signupForm.value,
		};
		if (!firstName && !lastName && !email && !password) return;

		this.store.dispatch(
			registerRequest({
				payload: {
					firstName: firstName!,
					lastName: lastName!,
					email: email!,
					password: password!,
				},
			})
		);
		this.signupForm.reset();
	}
}
