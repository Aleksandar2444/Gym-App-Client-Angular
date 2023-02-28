import { createReducer, on } from '@ngrx/store';
import { CreatePostRequestBody, SelectedPost } from './models/post.models';
import {
	initialState,
	initialStateById,
	PostStatus,
} from './models/post.store.models';
import {
	postByIdRequest,
	postByIdRequestSuccess,
	postCreateRequest,
	postCreateRequestSuccess,
	postDeleteRequest,
	postDeleteRequestSuccess,
	postError,
	postLikeError,
	postLikeRequest,
	postLikeRequestSuccess,
	postRequest,
	postRequestSuccess,
	postUpdateRequest,
	postUpdateRequestSuccess,
} from './post.actions';

export const postReducer = createReducer(
	initialState,
	// Posts
	on(postRequest, (state) => ({ ...state, status: PostStatus.LOADING })),
	on(postRequestSuccess, (state, { payload }) => ({
		...state,
		error: null,
		post: payload,
		status: PostStatus.SUCCESS,
	})),
	on(postError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
	})),
	// Post create
	on(postCreateRequest, (state) => ({
		...state,
		status: PostStatus.LOADING,
	})),
	on(postCreateRequestSuccess, (state, { payload }) => ({
		...state,
		...(payload as CreatePostRequestBody),
		error: null,
		status: PostStatus.SUCCESS,
		message: 'Post created successfully!',
	})),
	on(postError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
		message: payload.message,
	})),
	// Post update
	on(postUpdateRequest, (state) => ({
		...state,
		status: PostStatus.LOADING,
	})),
	on(postUpdateRequestSuccess, (state, { payload }) => ({
		...state,
		...(payload as SelectedPost),
		error: null,
		status: PostStatus.SUCCESS,
		message: 'Post updated successfully!',
	})),
	on(postError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
		message: payload.message,
	})),
	// Post delete
	on(postDeleteRequest, (state) => ({
		...state,
		status: PostStatus.LOADING,
	})),
	on(postDeleteRequestSuccess, (state, { payload }) => ({
		...state,
		error: payload,
		post: payload,
		status: PostStatus.SUCCESS,
		message: 'Post deleted successfully!',
	})),
	on(postError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
		message: payload.message,
	}))
);

export const postByIdReducer = createReducer(
	initialStateById,
	// Post by id
	on(postByIdRequest, (state) => ({ ...state, status: PostStatus.LOADING })),
	on(postByIdRequestSuccess, (state, { payload }) => ({
		...state,
		error: null,
		post: payload,
		status: PostStatus.SUCCESS,
	})),
	on(postError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
	})),
	// Post likes
	on(postLikeRequest, (state) => ({ ...state, status: PostStatus.LOADING })),
	on(postLikeRequestSuccess, (state, { payload }) => ({
		...state,
		error: null,
		post: payload,
		status: PostStatus.SUCCESS,
	})),
	on(postLikeError, (state, { payload }) => ({
		...state,
		post: payload,
		error: PostStatus.ERROR,
	}))
);
