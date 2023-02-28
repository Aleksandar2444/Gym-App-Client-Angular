import { postByIdRequest } from '@@shared/store/posts/post.actions';
import { selectPostById } from '@@shared/store/posts/post.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-post-details',
	templateUrl: './post-details.component.html',
	styleUrls: ['./post-details.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostDetailsComponent implements OnInit {
	selectedPost$ = this.store.select(selectPostById);

	constructor(
		private readonly route: ActivatedRoute,
		private readonly store: Store
	) {}

	ngOnInit(): void {
		const postId = this.route.snapshot.params.id;

		this.store.dispatch(
			postByIdRequest({
				payload: postId,
			})
		);
	}
}
