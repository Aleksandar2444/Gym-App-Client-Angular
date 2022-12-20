import { StorageService } from '@@shared/services/storage.service';
import { selectUser } from '@@shared/store/auth/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject, takeUntil } from 'rxjs';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	user$ = this.store.select(selectUser);

	private unsubscribe$: Subject<void> = new Subject();
	// private unsubscribe$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor(
		private readonly router: Router,
		private readonly store: Store,
		private readonly storageService: StorageService
	) {}

	ngOnInit(): void {
		this.user$.pipe(takeUntil(this.unsubscribe$)).subscribe((value) => {
			if (!value) {
				this.router.navigate(['auth', 'login']);
			}
		});
	}

	onToggle() {}

	ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
		// this.unsubscribe$.next(true);
		// this.unsubscribe$.unsubscribe();
	}
}
