import {
	Component,
	EventEmitter,
	OnInit,
	Output,
	OnDestroy,
} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() sidenavToggle = new EventEmitter<void>();
	isAuth = false;
	authSubscription: Subscription;
	constructor(private authService: AuthService) {}
	ngOnInit(): void {
		this.authSubscription = this.authService.authChange.subscribe(
			(authStatus) => {
				this.isAuth = authStatus;
			}
		);
	}
	onToggle() {
		this.sidenavToggle.emit();
	}

	onLogout() {
		this.authService.logoutUser();
	}

	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
