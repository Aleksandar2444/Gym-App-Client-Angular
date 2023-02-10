import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { logoutRequest } from '@@shared/store/auth/auth.actions';
import { selectUser } from '@@shared/store/auth/auth.selectors';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	@Output() closeSidenav = new EventEmitter<void>();

	readonly isAuth$ = this.store.select(selectUser);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {}

	onClose() {
		this.closeSidenav.emit();
	}

	onLogout() {
		this.store.dispatch(logoutRequest({ payload: null }));
	}
}
