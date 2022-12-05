import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from '@@training/training/training.component';
import { CurrentTrainingComponent } from '@@training/current-training/current-training.component';
import { NewTrainingComponent } from '@@training/new-training/new-training.component';
import { PastTrainingsComponent } from '@@training/past-trainings/past-trainings.component';
import { StopTrainingComponent } from '@@training/stop-training/stop-training.component';
import { MaterialModule } from '@@shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		StopTrainingComponent,
	],

	imports: [
		CommonModule,
		TrainingRoutingModule,
		MaterialModule,
		FormsModule,
		FlexLayoutModule,
	],
	exports: [
		TrainingComponent,
		CurrentTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		StopTrainingComponent,
	],
})
export class TrainingModule {}
