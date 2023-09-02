import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '@@shared/material/material.module';

@NgModule({
	declarations: [NotFoundComponent],
	imports: [
		CommonModule,
		NotFoundRoutingModule,
		FlexLayoutModule,
		MaterialModule,
	],
	exports: [NotFoundComponent],
})
export class NotFoundModule {}
