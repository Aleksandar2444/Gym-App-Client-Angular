import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnDestroy {
	unsubscribe$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	constructor() {}

	ngOnDestroy(): void {
		this.unsubscribe$.next(true);
		this.unsubscribe$.unsubscribe();
	}
}
