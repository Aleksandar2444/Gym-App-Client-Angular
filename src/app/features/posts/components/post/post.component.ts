import { Post, SelectedPost } from '@@features/posts/models/model';
import { postLikeRequest } from '@@shared/store/posts/post.actions';
import {
	ChangeDetectionStrategy,
	Component,
	OnInit,
	Input,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit {
	@Input() post: Post | SelectedPost;

	constructor(
		private readonly router: Router,
		private readonly store: Store
	) {}

	ngOnInit(): void {}

	onPostSelect() {
		this.router.navigate(['posts', this.post._id]);
	}

	onPostLike(event: Event) {
		event.stopImmediatePropagation();

		this.store.dispatch(
			postLikeRequest({
				payload: this.post._id,
			})
		);
	}
}
