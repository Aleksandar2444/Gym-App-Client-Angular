import { FormControl } from '@angular/forms';

export interface UserProfileForm {
	gymNickname: FormControl<string>;
	country: FormControl<string>;
	city: FormControl<string>;
	about: FormControl<string>;
}

export interface Country {
	_id: string;
	value: string;
	viewValue: string;
}

export interface UserDataResponse {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	posts: string[];
	comments: string[];
	createdAt: string;
	updatedAt: string;
	about: string;
	city: string;
	country: string;
	gymNickname: string;
}
