import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { zxcvbn } from '@zxcvbn-ts/core';

export function passwordValidator(): ValidatorFn {
	return (controls: AbstractControl): ValidationErrors | null => {
		const value = controls.value;

		if (!value) {
			return null;
		}

		zxcvbn(value);

		return !value ? { passwordStrength: true } : null;
	};
}
