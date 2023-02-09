import { BaseComponent } from '@@shared/base-component/base/base.component';
import { AuthService } from '@@shared/services/auth.service';
import { StorageService } from '@@shared/services/storage.service';
import { selectUser } from '@@shared/store/auth/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeUntil, tap } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent extends BaseComponent implements OnInit {
	user$ = this.store.select(selectUser);

	constructor(
		private readonly router: Router,
		private readonly store: Store,
		private readonly storageService: StorageService,
		private readonly authService: AuthService
	) {
		super();
	}

	ngOnInit(): void {
		this.user$
			.pipe(
				takeUntil(this.destroy$),
				tap((value) => {
					if (!value) {
						this.router.navigate(['auth', 'login']);
					}

					const email = this.authService.getEmailFromLocalStorage();

					if (email) {
						this.authService.removeEmailFromLocalStorage();

						this.router.navigate([
							'auth',
							'reset-password',
							'resetPasswordToken',
						]);
					}
				})
			)
			.subscribe();
	}

	onToggle() {}
}
