import { Validators } from '@angular/forms';
import { zxcvbnValidator } from '@@shared/zxcvbnValidator/zxcvbnValidator';

export const validatorsArray = [
	Validators.required,
	Validators.minLength(8),
	Validators.pattern(/^(?=.*[\d])(?=.*[!@#$%^&`*])[\w!@#$%^&`*]{8,}$/),
	zxcvbnValidator(1),
];
