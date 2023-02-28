import { createAction, props } from '@ngrx/store';
import {
	CreatePostRequestBody,
	Post,
	SelectedPost,
} from './models/post.models';

// Post action
export const postRequest = createAction('[Post] Post Request');

// Post success action
export const postRequestSuccess = createAction(
	'[Post] Post Success',
	props<{ payload: Post[] }>()
);

// Post error action
export const postError = createAction(
	'[Post] Post Error',
	props<{ payload: any }>()
);

// Post by id action
export const postByIdRequest = createAction(
	'[Post Id] Post Id Request',
	props<{ payload: string }>()
);

// Post by id success action
export const postByIdRequestSuccess = createAction(
	'[Post Id] Post Id Success',
	props<{ payload: SelectedPost }>()
);

// Post like request
export const postLikeRequest = createAction(
	'[Post Like] Post Like Request',
	props<{ payload: string }>()
);

// Post like success
export const postLikeRequestSuccess = createAction(
	'[Post Like] Post Like Success',
	props<{ payload: SelectedPost }>()
);

// Post like error
export const postLikeError = createAction(
	'[Post Like] Post Like Error',
	props<{ payload: any }>()
);

// Post create request
export const postCreateRequest = createAction(
	'[Post Create] Post Create Request',
	props<{ payload: { title: string; body: string } }>()
);

// Post create success
export const postCreateRequestSuccess = createAction(
	'[Post Create] Post Create Success',
	props<{ payload: CreatePostRequestBody }>()
);

// Post update request
export const postUpdateRequest = createAction(
	'[Post Update] Post Update Request',
	props<{ payload: { postId: string; title: string; body: string } }>()
);

// Post update success
export const postUpdateRequestSuccess = createAction(
	'[Post Update] Post Update Success',
	props<{ payload: SelectedPost }>()
);

// Post delete request
export const postDeleteRequest = createAction(
	'[Post Delete] Post Delete Request',
	props<{ payload: string }>()
);

// Post delete success
export const postDeleteRequestSuccess = createAction(
	'[Post Delete] Post Delete Success',
	props<{ payload: any }>()
);
