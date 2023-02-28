import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsService } from './services/comments.service';
import { CommentFormComponent } from './components/comment-form/comment-form.component';
import { CommentsListComponent } from './components/comments-list/comments-list.component';
import { UserCommentsComponent } from './components/user-comments/user-comments.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [
		CommentFormComponent,
		CommentsListComponent,
		UserCommentsComponent,
	],
	imports: [CommonModule, CommentsRoutingModule, ReactiveFormsModule],
	providers: [CommentsService],
	exports: [
		CommentFormComponent,
		CommentsListComponent,
		UserCommentsComponent,
	],
})
export class CommentsModule {}
