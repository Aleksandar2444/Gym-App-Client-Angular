import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from '@@training/training/training.component';
import { MaterialModule } from '@@shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [TrainingComponent],

	imports: [
		CommonModule,
		TrainingRoutingModule,
		MaterialModule,
		FormsModule,
		FlexLayoutModule,
	],
	exports: [TrainingComponent],
})
export class TrainingModule {}
