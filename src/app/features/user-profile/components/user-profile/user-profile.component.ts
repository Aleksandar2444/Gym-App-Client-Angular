import { BaseComponent } from '@@shared/base-component/base/base.component';
import { CoreService } from '@@shared/services/core.service';
import { UserInfo } from '@@shared/store/auth/models/auth.user.models';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { map, takeWhile } from 'rxjs';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends BaseComponent implements OnInit {
	user: UserInfo | null = null;

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
				takeWhile(() => !!this.destroy$),
				map((value) => {
					this.user = value as UserInfo;
				})
			)
			.subscribe();
	}
}
