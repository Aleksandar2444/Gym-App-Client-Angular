import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class NotificationService {
	constructor(private readonly toastrService: ToastrService) {}

	showSuccess(msg: string) {
		this.toastrService.success(msg, '', {
			easing: 'ease-in',
			easeTime: 1000,
		});
	}

	showError(msg: string) {
		this.toastrService.error(msg, '', {
			easing: 'ease-in',
			easeTime: 1000,
		});
	}
}
