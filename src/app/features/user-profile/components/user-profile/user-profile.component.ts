import { Post, SelectedPost } from '@@features/posts/models/model';
import { UserInfoResponse } from '@@features/user-profile/models/model';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { CoreService } from '@@shared/services/core.service';
import { PostsService } from '@@shared/services/post.service';
import { postDeleteRequest } from '@@shared/store/posts/post.actions';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, takeUntil } from 'rxjs';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends BaseComponent implements OnInit {
	@Input() post: Post | SelectedPost;

	readonly posts$ = new BehaviorSubject<Post[]>([]);

	user: UserInfoResponse;
	postArray: Post[];

	constructor(
		private readonly coreService: CoreService,
		private readonly postsService: PostsService,
		private readonly router: Router,
		private readonly store: Store
	) {
		super();
	}

	ngOnInit(): void {
		this.onInitFindUser();
	}

	getValuesFromPost() {
		this.posts$
			.pipe(
				takeUntil(this.destroy$),
				map((value) => {
					this.postArray = [...value];
				})
			)
			.subscribe();
	}

	onInitFindUser() {
		this.coreService
			.findUserById()
			.pipe(
				takeUntil(this.destroy$),
				map((value: UserInfoResponse) => {
					this.user = value;

					if (this.user) {
						// When on posts by user page
						this.postsService
							.getPostsByUser()
							.pipe(
								takeUntil(this.destroy$),
								map((value) => {
									this.posts$.next(value as Post[]);
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe();

		this.getValuesFromPost();
	}

	onPostSelect(post: string) {
		this.router.navigate(['posts', post]);
	}

	onPostEdit(event: Event, post: Post) {
		event.stopImmediatePropagation();
		this.postsService.setPostToEdit(post);
	}

	onPostDelete(event: Event, post: Post) {
		event.stopImmediatePropagation();

		this.store.dispatch(
			postDeleteRequest({
				payload: post._id,
			})
		);
	}
}
