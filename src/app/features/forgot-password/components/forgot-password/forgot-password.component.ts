import { ForgotPasswordService } from '@@features/forgot-password/services/forgot-password.service';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { selectUserEmail } from '@@shared/store/auth/auth.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil } from 'rxjs';

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent extends BaseComponent implements OnInit {
	userEmail$ = this.store.select(selectUserEmail);

	forgotPasswordForm: FormGroup;
	isFormSubmitted = false;

	constructor(
		private readonly forgotPasswordService: ForgotPasswordService,
		private readonly router: Router,
		private readonly store: Store
	) {
		super();
	}

	ngOnInit() {
		this.initForm();
	}

	initForm() {
		this.forgotPasswordForm = new FormGroup({
			email: new FormControl<string>('', [
				Validators.required,
				Validators.email,
			]),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.forgotPasswordForm.invalid) return;
		const email = { ...this.forgotPasswordForm.value };

		this.forgotPasswordService.forgotPassword(email).subscribe();

		this.router.navigate(['auth', 'forgot-password', 'email-sent']);

		this.userEmail$.pipe(takeUntil(this.unsubscribe$));
	}
}
