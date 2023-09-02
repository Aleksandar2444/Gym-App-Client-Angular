import { Injectable, Input } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { NotificationService } from '@@shared/services/notification.service';
import { Router } from '@angular/router';

import { PostsService } from '@@shared/services/post.service';
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
import {
	BehaviorSubject,
	catchError,
	map,
	of,
	switchMap,
	tap,
	withLatestFrom,
} from 'rxjs';
import {
	CreatePostRequestBody,
	Post,
	SelectedPost,
} from './models/post.models';
import { Store, select } from '@ngrx/store';
import { selectPostById } from './post.selectors';
import { selectPost } from './post.selectors';

@Injectable()
export class PostEffects {
	@Input() post: Post | SelectedPost;
	// readonly posts$ = new BehaviorSubject<Post[]>([]);
	// readonly selectedPost$ = new BehaviorSubject<SelectedPost | null>(null);

	constructor(
		private readonly actions$: Actions,
		private readonly notificationService: NotificationService,
		private readonly router: Router,
		private readonly postService: PostsService,
		private readonly store: Store
	) {}

	getAllPostsRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postRequest),
			switchMap((action) => {
				return this.postService.getAllPosts().pipe(
					map((posts) => {
						const postsApi = posts as Post[];

						return postRequestSuccess({
							payload: postsApi,
						});
					}),
					catchError((error) => {
						this.notificationService.showError(
							'Something went wrong.'
						);
						return of(postError({ payload: error }));
					})
				);
			})
		)
	);

	getPostByIdRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postByIdRequest),
			switchMap((action) => {
				return this.postService.getPostById(action.payload).pipe(
					map((postId) => {
						const post = postId as SelectedPost;
						console.log(postId);
						console.log(post);
						return postByIdRequestSuccess({
							payload: post,
						});
					}),
					catchError((error) => {
						this.notificationService.showError(
							'Something went wrong.'
						);
						return of(postError({ payload: error }));
					})
				);
			})
		)
	);

	postLikeRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postLikeRequest),
			switchMap((action) => {
				return this.postService.likePost(action.payload).pipe(
					map((value) => {
						value as { likes: number };

						const post = value;

						post.likes = value.likes;

						// if (this.selectedPost$.value) {
						// 	// User is in post details
						// 	const post = this.selectedPost$.value;

						// 	post.likes = value.likes;

						// 	this.selectedPost$.next(post);
						// } else {
						// 	// User is in post list
						// 	const posts = this.posts$.value;

						// 	posts.forEach((post) => {
						// 		if (post._id === this.post._id) {
						// 			post.likes = value.likes;
						// 			return;
						// 		}
						// 	});

						// 	this.posts$.next(posts);
						// }

						return postLikeRequestSuccess({
							payload: value,
						});
					}),
					catchError((error) => {
						this.notificationService.showError(
							'Something went wrong.'
						);
						return of(postLikeError({ payload: error }));
					})
				);
			})
		)
	);

	postDeleteRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postDeleteRequest),
			switchMap((action) => {
				return this.postService.deletePost(action.payload).pipe(
					map((value) => {
						// const updatedPosts = this.posts$.value.filter(
						// 	(element) => element._id !== value._id
						// );

						// YOU CAN GET THE STATE
						const id = action.payload;
						// this.posts$.next(updatedPosts);
						return postDeleteRequestSuccess({
							payload: { postId: id },
						});
					}),
					catchError((error) => {
						console.log(error);
						this.notificationService.showError(
							'Something went wrong.'
						);
						return of(postError({ payload: error }));
					})
				);
			})
		)
	);

	postCreateRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postCreateRequest),
			switchMap((actions) => {
				return this.postService
					.createPost(actions.payload.title, actions.payload.body)
					.pipe(
						map((value) => {
							const post = value as CreatePostRequestBody;

							this.router.navigate(['posts']);

							return postCreateRequestSuccess({
								payload: post,
							});
						}),
						catchError((error) => {
							this.notificationService.showError(
								'Something went wrong.'
							);
							return of(postError({ payload: error }));
						})
					);
			})
		)
	);

	postUpdateRequest$ = createEffect(() =>
		this.actions$.pipe(
			ofType(postUpdateRequest),
			switchMap((action) => {
				return this.postService
					.updatePost(
						action.payload.postId,
						action.payload.title,
						action.payload.body
					)
					.pipe(
						map((value) => {
							const post = value as SelectedPost;

							this.router.navigate([
								'posts',
								action.payload.postId,
							]);

							return postUpdateRequestSuccess({
								payload: post,
							});
						}),
						catchError((error) => {
							this.notificationService.showError(
								'Something went wrong.'
							);
							return of(postError({ payload: error }));
						})
					);
			})
		)
	);

	postCreatedSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(postCreateRequestSuccess),
				tap({
					next: (message) => {
						this.notificationService.showSuccess(
							message.payload.message
						);
					},
				})
			),
		{ dispatch: false }
	);

	postUpdatedSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(postUpdateRequestSuccess),
				tap({
					next: (message) => {
						this.notificationService.showSuccess(
							'Post Updated Successfully!'
						);
					},
				})
			),
		{ dispatch: false }
	);

	postDeletedSuccessMessage$ = createEffect(
		() =>
			this.actions$.pipe(
				ofType(postDeleteRequestSuccess),
				tap({
					next: (message) => {
						this.notificationService.showSuccess(
							'Post Deleted Successfully!'
						);
					},
				})
			),
		{ dispatch: false }
	);
}
