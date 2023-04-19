import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
	CreatePostRequestBody,
	Post,
	SelectedPost,
} from '@@shared/store/posts/models/post.models';

const { API_URL } = environment;

@Injectable({
	providedIn: 'root',
})
export class PostsService {
	private readonly getAllPostsURL = `${API_URL}/posts`;
	private readonly updatePostURL = `${API_URL}/posts/edit`;
	private readonly getUserPostURL = `${API_URL}/user/posts`;
	private readonly likePostURL = `${API_URL}/posts`;

	readonly postToEdit$ = new BehaviorSubject<Post>({} as Post);

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router
	) {}

	setPostToEdit(post: Post) {
		this.postToEdit$.next(post);
		this.router.navigate(['posts', 'edit', post._id]);
	}
	getPostToEdit() {}

	getAllPosts() {
		return this.http.get(this.getAllPostsURL);
	}

	getPostById(postId: string): Observable<SelectedPost> {
		return this.http.get<SelectedPost>(
			`${this.getAllPostsURL}/${encodeURIComponent(postId)}`
		);
	}

	getPostsByUser() {
		return this.http.get(this.getUserPostURL);
	}

	createPost(title: string, body: string): Observable<CreatePostRequestBody> {
		return this.http.post<CreatePostRequestBody>(this.getAllPostsURL, {
			title,
			body,
		});
	}

	updatePost(
		postId: string,
		title: string,
		body: string
	): Observable<SelectedPost> {
		return this.http.patch<SelectedPost>(
			`${this.updatePostURL}/${encodeURIComponent(postId)}`,
			{
				title,
				body,
			}
		);
	}

	deletePost(postId: string): Observable<SelectedPost> {
		return this.http.delete<SelectedPost>(
			`${this.getAllPostsURL}/${encodeURIComponent(postId)}`
		);
	}

	likePost(postId: string): Observable<SelectedPost> {
		return this.http.patch<SelectedPost>(
			`${this.likePostURL}/${encodeURIComponent(postId)}/like`,
			null
		);
	}
}
