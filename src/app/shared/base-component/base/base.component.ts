import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-base',
	templateUrl: './base.component.html',
	styleUrls: ['./base.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponent implements OnDestroy {
	readonly destroy$ = new Subject();

	constructor() {}

	ngOnDestroy(): void {
		this.destroy$.next(true);
		this.destroy$.complete();
	}
}
