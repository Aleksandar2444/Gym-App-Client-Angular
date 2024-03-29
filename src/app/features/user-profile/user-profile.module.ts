import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UserProfileService } from './service/user-profile.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CoreService } from '@@shared/services/core.service';
import { PostsModule } from '@@features/posts/posts.module';
import { NgxSmartModalModule, NgxSmartModalService } from 'ngx-smart-modal';

@NgModule({
	declarations: [UserProfileComponent],
	imports: [
		CommonModule,
		UserProfileRoutingModule,
		ReactiveFormsModule,
		MaterialModule,
		FlexLayoutModule,
		PostsModule,
		NgxSmartModalModule.forChild(),
	],
	providers: [UserProfileService, CoreService, NgxSmartModalService],
	exports: [UserProfileComponent],
})
export class UserProfileModule {}
