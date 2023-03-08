import { FormControl } from '@angular/forms';

export interface UserInfoResponse {
	_id: string;
	firstName: string;
	lastName: string;
}

export interface UserData {
	gymNickname: string;
	country: string;
	city: string;
	about: string;
}

export interface UserProfileForm {
	gymNickname: FormControl<string>;
	country: FormControl<string>;
	city: FormControl<string>;
	about: FormControl<string>;
}

export interface Country {
	value: string;
	viewValue: string;
}
