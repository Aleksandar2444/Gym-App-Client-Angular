import {
	CommentForm,
	CommentRequestBody,
} from '@@features/comments/models/models';
import { CommentsService } from '@@features/comments/services/comments.service';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { PostsService } from '@@shared/services/post.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { takeUntil, tap } from 'rxjs';

@Component({
	selector: 'app-comment-form',
	templateUrl: './comment-form.component.html',
	styleUrls: ['./comment-form.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentFormComponent extends BaseComponent implements OnInit {
	commentForm: FormGroup<CommentForm>;

	constructor(
		private readonly commentsService: CommentsService,
		private readonly postsService: PostsService,
		private readonly route: ActivatedRoute,
		private readonly router: Router
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();
	}

	initForm() {
		this.commentForm = new FormGroup<CommentForm>({
			body: new FormControl<string>('', {
				validators: [Validators.required, Validators.minLength(1)],
				nonNullable: true,
			}),
		});
	}

	onFormSubmit() {
		// const postId = this.route.snapshot.params.id;
		const postObj = localStorage.getItem('post');
		if (!postObj) return;
		const post = JSON.parse(postObj);

		this.commentsService
			.createCommnet(this.commentForm.value.body!, post._id)
			.pipe(
				takeUntil(this.destroy$),
				tap((value: CommentRequestBody) => {
					this.postsService.getPostById(value.postId);
					this.router.navigate(['posts']);
				})
			)
			.subscribe();
		this.commentForm.reset();
		localStorage.removeItem('post');
	}
}
