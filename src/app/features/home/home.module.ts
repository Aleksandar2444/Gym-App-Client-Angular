import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from '@@home/home/home.component';
import { PostsModule } from '../posts/posts.module';

@NgModule({
	declarations: [HomeComponent],
	imports: [CommonModule, HomeRoutingModule, PostsModule],
	exports: [HomeComponent],
})
export class HomeModule {}
