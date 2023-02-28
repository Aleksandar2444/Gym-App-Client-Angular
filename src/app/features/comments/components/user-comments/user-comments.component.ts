import { PostComment } from '@@features/comments/models/models';
import { CommentsService } from '@@features/comments/services/comments.service';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { AuthService } from '@@shared/services/auth.service';
import { LoggedInUser } from '@@shared/store/auth/models/auth.user.models';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, takeUntil, tap } from 'rxjs';

@Component({
	selector: 'app-user-comments',
	templateUrl: './user-comments.component.html',
	styleUrls: ['./user-comments.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCommentsComponent extends BaseComponent implements OnInit {
	readonly userComments$ = new BehaviorSubject<PostComment[]>([]);

	currentUser: LoggedInUser;

	constructor(
		private readonly commentsService: CommentsService,
		private readonly authService: AuthService
	) {
		super();
		const { user } = this.authService.getUserFromLocalStorage();
		this.currentUser = user;
	}

	ngOnInit(): void {
		this.commentsService
			.getCommentsByUser()
			.pipe(
				takeUntil(this.destroy$),
				map((value) => value as PostComment[]),
				tap((comments) => {
					this.userComments$.next(comments);
				})
			)
			.subscribe();
	}
}
