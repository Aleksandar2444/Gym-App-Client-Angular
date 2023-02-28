import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/models/auth.store.models';
import { PostByIdState, PostState } from './posts/models/post.store.models';
import { postByIdReducer, postReducer } from './posts/post.reducer';

export interface AppState {
	user: AuthState;
	post: PostState;
	postId: PostByIdState;
}

export const appReducer: ActionReducerMap<AppState> = {
	user: authReducer,
	post: postReducer,
	postId: postByIdReducer,
};
