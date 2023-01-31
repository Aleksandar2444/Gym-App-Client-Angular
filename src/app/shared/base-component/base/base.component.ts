import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnDestroy {
	destroyAsObservable$: Observable<boolean>; // for async operations
	subscriptions: Subscription[] = [];

	destroy = false;

	private destory$ = new BehaviorSubject<boolean>(false);

	constructor() {
		this.destroyAsObservable$ = this.destory$.asObservable(); // for async operations
		this.subscriptions.push(
			this.destroyAsObservable$
				.pipe(tap((value) => (this.destroy = value)))
				.subscribe()
		);
	}

	ngOnDestroy(): void {
		this.destory$.next(true);
		this.subscriptions.forEach((subscription) => {
			if (subscription) {
				subscription.unsubscribe();
			}
		});
	}
}
