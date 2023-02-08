import { FormControl } from '@angular/forms';

export interface SignupForm {
	firstName: FormControl<string>;
	lastName: FormControl<string>;
	email: FormControl<string>;
	password: FormControl<string>;
}
