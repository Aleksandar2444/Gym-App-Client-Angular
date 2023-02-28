import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutRequest } from '@@shared/store/auth/auth.actions';
import { selectToken } from '@@shared/store/auth/auth.selectors';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
	@Output() sidenavToggle = new EventEmitter<void>();

	readonly isLoggedIn$ = this.store.select(selectToken);

	constructor(
		private readonly store: Store,
		private readonly router: Router
	) {}

	ngOnInit(): void {}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}

	onLogout() {
		this.store.dispatch(logoutRequest({ payload: null }));
	}
}
