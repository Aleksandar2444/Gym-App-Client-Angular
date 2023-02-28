import { PostComment } from '@@features/comments/models/models';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
	selector: 'app-comments-list',
	templateUrl: './comments-list.component.html',
	styleUrls: ['./comments-list.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsListComponent {
	@Input() comments: PostComment[] = [];
	@Input() showPostLink: boolean = false;
}
