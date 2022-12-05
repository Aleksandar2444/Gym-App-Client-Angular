import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CurrentTrainingComponent } from './components/current-training/current-training.component';
import { NewTrainingComponent } from './components/new-training/new-training.component';
import { PastTrainingsComponent } from './components/past-trainings/past-trainings.component';
import { StopTrainingComponent } from './components/stop-training/stop-training.component';
import { TrainingComponent } from './components/training/training.component';

const routes: Routes = [
	{ path: '', component: TrainingComponent },
	{ path: 'current-training', component: CurrentTrainingComponent },
	{ path: 'new-training', component: NewTrainingComponent },
	{ path: 'past-trainings', component: PastTrainingsComponent },
	{ path: 'stop-training', component: StopTrainingComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TrainingRoutingModule {}
