import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { SpinnerService } from '@@shared/services/spinner.service';

@Component({
	selector: 'app-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class SpinnerComponent implements OnInit {
	get spinner$() {
		return this.spinnerService.spinner$;
	}

	constructor(private readonly spinnerService: SpinnerService) {}

	ngOnInit(): void {}
}
