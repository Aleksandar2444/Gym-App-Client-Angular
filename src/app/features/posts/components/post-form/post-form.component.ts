import { Post, PostForm } from '@@features/posts/models/model';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { takeUntil, map } from 'rxjs';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { Store } from '@ngrx/store';
import {
	postCreateRequest,
	postUpdateRequest,
} from '@@shared/store/posts/post.actions';
import { PostsService } from '@@shared/services/post.service';

@Component({
	selector: 'app-post-form',
	templateUrl: './post-form.component.html',
	styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent extends BaseComponent implements OnInit {
	postForm: FormGroup<PostForm>;
	postToEdit: Post;

	constructor(
		private readonly location: Location,
		private readonly postsService: PostsService,
		private readonly route: ActivatedRoute,
		private readonly store: Store
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();

		this.postsService.postToEdit$
			.pipe(
				takeUntil(this.destroy$),
				map((value) => {
					const postId = this.route.snapshot.params.id;

					if (postId && value) {
						this.postToEdit = value;

						this.postForm.setValue({
							title: this.postToEdit.title,
							body: this.postToEdit.body,
						});
					} else {
						this.postForm.setValue({
							title: '',
							body: '',
						});
					}
				})
			)
			.subscribe();
	}

	initForm() {
		this.postForm = new FormGroup<PostForm>({
			title: new FormControl<string>('', {
				validators: [Validators.required, Validators.minLength(5)],
				nonNullable: true,
			}),
			body: new FormControl<string>('', {
				validators: [Validators.required, Validators.minLength(1)],
				nonNullable: true,
			}),
		});
	}

	onFormSubmit() {
		if (!this.postForm.value) return;

		const { title, body } = this.postForm.value;
		if (!title && !body) return;

		if (this.postToEdit) {
			this.store.dispatch(
				postUpdateRequest({
					payload: {
						postId: this.postToEdit._id,
						title: title!,
						body: body!,
					},
				})
			);
		} else {
			this.store.dispatch(
				postCreateRequest({
					payload: {
						title: title!,
						body: body!,
					},
				})
			);
		}
	}

	goBack() {
		this.location.back();
	}
}
