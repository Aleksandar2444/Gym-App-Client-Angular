import { postRequest } from '@@shared/store/posts/post.actions';
import { selectPost } from '@@shared/store/posts/post.selectors';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
	posts$ = this.store.select(selectPost);

	constructor(private readonly store: Store) {}

	ngOnInit(): void {
		this.onInitGetAllPosts();
	}

	onInitGetAllPosts() {
		this.store.dispatch(postRequest());
	}
}
