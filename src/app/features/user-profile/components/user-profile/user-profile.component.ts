import { UserInfoResponse } from '@@features/user-profile/models/model';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { CoreService } from '@@shared/services/core.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, takeUntil } from 'rxjs';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends BaseComponent implements OnInit {
	user: UserInfoResponse;

	constructor(private readonly coreService: CoreService) {
		super();
	}

	ngOnInit(): void {
		this.onInitFunction();
	}

	onInitFunction() {
		this.coreService
			.findUserById()
			.pipe(
				takeUntil(this.destroy$),
				map((value: UserInfoResponse) => {
					this.user = value;
				})
			)
			.subscribe();
	}
}
