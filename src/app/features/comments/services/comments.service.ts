import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { CommentRequestBody } from '../models/models';

const { API_URL } = environment;

@Injectable()
export class CommentsService {
	private readonly createCommentURL = `${API_URL}/comments`;

	constructor(private readonly http: HttpClient) {}

	createCommnet(
		body: string,
		postId: string
	): Observable<CommentRequestBody> {
		return this.http.post<CommentRequestBody>(this.createCommentURL, {
			post: postId,
			body,
		});
	}

	getCommentsByUser() {
		return this.http.get(`${API_URL}/user/comments`);
	}
}
