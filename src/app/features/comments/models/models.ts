import { FormControl } from '@angular/forms';

export interface PostComment {
	_id: string;
	body: string;
	author: {
		_id: string;
		firstName: string;
		lastName: string;
		gymNickname: string;
	};
	post: string;
	createdAt: string;
	updatedAt: string;
}

export interface CommentForm {
	body: FormControl<string>;
}

export interface CommentRequestBody {
	body: string;
	postId: string;
}
