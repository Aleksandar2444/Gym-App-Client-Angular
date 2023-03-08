import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { PostComponent } from './components/post/post.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommentsModule } from '../comments/comments.module';
import { MaterialModule } from '@@shared/material/material.module';

@NgModule({
	declarations: [
		PostComponent,
		PostDetailsComponent,
		PostFormComponent,
		PostListComponent,
	],
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
		MaterialModule,
	],
})
export class PostsModule {}
