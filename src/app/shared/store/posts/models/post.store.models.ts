import { Post, SelectedPost } from './post.models';

export enum PostStatus {
	PENDING = 'pending',
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

// Posts
export interface PostState {
	post: Post[] | null;
	error: string | null;
	status: PostStatus;
}

export const initialState: PostState = {
	post: null,
	error: null,
	status: PostStatus.PENDING,
};

// Post by id
export interface PostByIdState {
	post: string | null | SelectedPost;
	error: string | null;
	status: PostStatus;
}

export const initialStateById: PostByIdState = {
	post: null,
	error: null,
	status: PostStatus.PENDING,
};
