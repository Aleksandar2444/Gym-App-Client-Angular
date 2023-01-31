import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '@@shared/store/auth/auth.actions';
import { LoginForm } from '@@features/login/models/model';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup<LoginForm>;
	isFormSubmitted = false;

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.loginForm = new FormGroup<LoginForm>({
			email: new FormControl<string>('', {
				validators: [Validators.required, Validators.email],
				nonNullable: true,
			}),
			password: new FormControl<string>('', {
				validators: [Validators.required],
				nonNullable: true,
			}),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.loginForm.invalid) return;

		const { email, password } = { ...this.loginForm.value };
		if (!email && !password) return;

		this.store.dispatch(
			loginRequest({
				payload: {
					email: email!,
					password: password!,
				},
			})
		);
		this.loginForm.reset();
	}
}
