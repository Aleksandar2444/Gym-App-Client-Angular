import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';
import { PostsService } from '@@shared/services/post.service';

@NgModule({
	declarations: [
		PostComponent,
		PostDetailsComponent,
		PostFormComponent,
		PostListComponent,
	],
	providers: [PostsService],
	exports: [
		PostComponent,
		PostDetailsComponent,
		PostFormComponent,
		PostListComponent,
	],
	imports: [
		CommonModule,
		PostsRoutingModule,
		ReactiveFormsModule,
		CommentsModule,
	],
})
export class PostsModule {}
