import { postRequest } from '@@shared/store/posts/post.actions';
import { selectPost } from '@@shared/store/posts/post.selectors';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-post-list',
	templateUrl: './post-list.component.html',
	styleUrls: ['./post-list.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListComponent implements OnInit {
	posts$ = this.store.select(selectPost);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.onInitGetAllPosts();
	}

	onInitGetAllPosts() {
		this.store.dispatch(postRequest());
	}
}
