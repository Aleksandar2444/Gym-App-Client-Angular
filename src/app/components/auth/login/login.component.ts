import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isFormSubmitted = false;
	constructor(private readonly authService: AuthService) {}
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
		this.authService.loginUser(email, password);
	}
}
