import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { loginRequest } from '@@shared/store/auth/auth.actions';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isFormSubmitted = false;

	constructor(private readonly store: Store) {}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.loginForm = new FormGroup({
			email: new FormControl<string>('', [
				Validators.required,
				Validators.email,
			]),
			password: new FormControl<string>('', Validators.required),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.loginForm.invalid) return;
		const loginUserValues = { ...this.loginForm.value };
		this.store.dispatch(loginRequest({ payload: loginUserValues }));
		this.loginForm.reset();
	}
}
