import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectIsUserAuth, selectUser } from '@@shared/store/auth/auth.reducer';
import {
	getUserRequest,
	logoutRequest,
} from '@@shared/store/auth/auth.actions';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() sidenavToggle = new EventEmitter<void>();

	isAuth$ = this.store.select(selectIsUserAuth);
	user$ = this.store.select(selectUser);

	private unsubscribe$: Subject<void> = new Subject();
	// private unsubscribe$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		private readonly router: Router,
		private readonly store: Store
	) {}

	ngOnInit(): void {
		this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
			console.log(value);
			if (!value) {
				this.router.navigate(['auth', 'login']);
			} else {
				this.store.dispatch(getUserRequest({ payload: value._id }));
				this.router.navigate(['home']);
			}
		});
	}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}

	onLogout() {
		this.store.dispatch(logoutRequest({ payload: null }));
	}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		// this.unsubscribe$.next(true);
		// this.unsubscribe$.unsubscribe();
	}
}
