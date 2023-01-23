import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderRoutingModule } from './header-routing.module';
import { HeaderComponent } from '@@shared/header/components/header/header.component';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LogoutUserService } from '@@shared/services/logout-user.service';

@NgModule({
	declarations: [HeaderComponent],
	imports: [
		CommonModule,
		HeaderRoutingModule,
		MaterialModule,
		FlexLayoutModule,
	],
	providers: [LogoutUserService],
	exports: [HeaderComponent],
})
export class HeaderModule {}
