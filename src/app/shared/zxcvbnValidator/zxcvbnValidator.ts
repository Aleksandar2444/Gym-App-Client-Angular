import { AbstractControl, ValidatorFn } from '@angular/forms';
import { zxcvbn, zxcvbnOptions } from '@zxcvbn-ts/core';
import zxcvbnCommonPackage from '@zxcvbn-ts/language-common';
import zxcvbnEnPackage from '@zxcvbn-ts/language-en';
import { FeedbackType } from '@zxcvbn-ts/core/dist/types';

interface ZxcvbnValidator {
	zxcvbn: FeedbackType;
}

const options = {
	translations: zxcvbnEnPackage.translations,
	dictionary: {
		...zxcvbnCommonPackage.dictionary,
		...zxcvbnEnPackage.dictionary,
	},
	graphs: zxcvbnCommonPackage.adjacencyGraphs,
};

zxcvbnOptions.setOptions(options);

export const zxcvbnValidator =
	(minStrength: number): ValidatorFn =>
	(control: AbstractControl): ZxcvbnValidator | null => {
		let response: ZxcvbnValidator | null = null;
		const passwordString = control.value as string;

		if (passwordString?.length > 0) {
			const result = zxcvbn(passwordString);

			if (result.score <= minStrength) {
				response = {
					zxcvbn: result.feedback,
				};
			}
		}

		return response;
	};
