import { BaseComponent } from '@@shared/base-component/base/base.component';
import { StorageService } from '@@shared/services/storage.service';
import { selectUser } from '@@shared/store/auth/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { takeWhile } from 'rxjs';

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
		private readonly storageService: StorageService
	) {
		super();
	}

	ngOnInit(): void {
		this.user$.pipe(takeWhile(() => !this.destroy)).subscribe((value) => {
			if (!value) {
				this.router.navigate(['auth', 'login']);
			}
		});
	}

	onToggle() {}
}
