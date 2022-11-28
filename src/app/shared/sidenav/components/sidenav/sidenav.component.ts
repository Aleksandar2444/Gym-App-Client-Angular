import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from 'src/app/features/login/services/login.service';

@Component({
	selector: 'app-sidenav',
	templateUrl: './sidenav.component.html',
	styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
	@Output() closeSidenav = new EventEmitter<void>();

	isAuth = false;
	authSubscription: Subscription;

	constructor(
		private readonly loginService: LoginService,
		private readonly router: Router
	) {}

	ngOnInit(): void {
		this.authSubscription = this.loginService.authChange.subscribe(
			(authStatus) => {
				this.isAuth = authStatus;
			}
		);
	}

	onClose() {
		this.closeSidenav.emit();
	}
	onLogout() {
		this.loginService.logoutUser();
		this.router.navigate(['/login']);
	}
	ngOnDestroy(): void {
		this.authSubscription.unsubscribe();
	}
}
