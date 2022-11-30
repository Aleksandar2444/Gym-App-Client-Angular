import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/features/login/services/login.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isFormSubmitted = false;

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router
	) {}

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
		if (this.loginForm.invalid) return;
		this.isFormSubmitted = true;
		const { email, password } = this.loginForm.value;
		this.loginService.loginUser(email, password);
		this.router.navigate(['/home']);
	}
}
