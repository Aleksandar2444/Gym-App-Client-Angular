import { FormControl } from '@angular/forms';

export interface SignupForm {
	userName: FormControl<string>;
	email: FormControl<string>;
	password: FormControl<string>;
}
