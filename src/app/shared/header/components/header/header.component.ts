import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '@@shared/store/auth/auth.reducer';
import { logoutRequest } from '@@shared/store/auth/auth.actions';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Output() sidenavToggle = new EventEmitter<void>();

	isAuth$ = this.store.select(selectUser);

	constructor(
		private readonly router: Router,
		private readonly store: Store
	) {}

	ngOnInit(): void {
		this.router.navigate(['auth', 'login']);
	}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}

	onLogout() {
		this.store.dispatch(logoutRequest({ payload: null }));
		this.router.navigate(['auth', 'login']);
	}
}
