import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CommentRequestBody } from '../models/models';

const { API_URL } = environment;

@Injectable()
export class CommentsService {
	private readonly createCommentURL = `${API_URL}/comments`;
	private readonly commentsByUser = `${API_URL}/user/comments`;
	private readonly commentsByPost = `${API_URL}/user/comments-by-post`;

	constructor(private readonly http: HttpClient) {}

	createCommnet(
		body: string,
		postId: string
	): Observable<CommentRequestBody> {
		return this.http.post<CommentRequestBody>(this.createCommentURL, {
			body,
			post: postId,
		});
	}

	getCommentsByUser() {
		return this.http.get(this.commentsByUser);
	}

	getCommentsByPost(postId: string) {
		return this.http.get(
			`${this.commentsByPost}/${encodeURIComponent(postId)}`
		);
	}
}
