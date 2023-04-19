import { FormControl } from '@angular/forms';

export interface PostComment {
	_id: string;
	body: string;
	author: {
		_id: string;
		firstName: string;
		lastName: string;
	};
	post: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export interface CommentForm {
	body: FormControl<string>;
}

export interface CommentRequestBody {
	body: string;
	postId: string;
}
