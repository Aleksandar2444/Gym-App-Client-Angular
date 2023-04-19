import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SelectedPost } from './models/post.models';
import { PostByIdState, PostState } from './models/post.store.models';

// ('post') key defined in app.module
export const selectPostsState = createFeatureSelector<PostState>('post');

export const selectPost = createSelector(selectPostsState, (state) => {
	return state.post;
});

// ('postId') key defined in app.module
export const selectPostByIdState =
	createFeatureSelector<PostByIdState>('postId');

export const selectPostById = createSelector(selectPostByIdState, (state) => {
	return state.post as SelectedPost;
});
