import {
	Component,
	EventEmitter,
	OnInit,
	Output,
	OnDestroy,
} from '@angular/core';
import { LoginService } from 'src/app/features/login/services/login.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Output() sidenavToggle = new EventEmitter<void>();

	isAuth = false;
	authSubscription: Subscription;

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		this.router.navigate(['/login']);
		this.authSubscription = this.loginService.authChange.subscribe(
			(authStatus) => {
				this.isAuth = authStatus;
			}
		);
	}
	onToggleSidenav() {
		this.sidenavToggle.emit();
	}
	onLogout() {
		this.loginService.logoutUser();
		this.router.navigate(['/login']);
	}
	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
