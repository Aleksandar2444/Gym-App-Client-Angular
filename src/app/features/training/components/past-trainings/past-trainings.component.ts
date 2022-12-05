import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '@@exercise/exercise.model';
import { TrainingService } from '@@training-service/training.service';

@Component({
	selector: 'app-past-trainings',
	templateUrl: './past-trainings.component.html',
	styleUrls: ['./past-trainings.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush
})
export class PastTrainingsComponent implements OnInit {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	constructor(private readonly trainingService: TrainingService) {}

	ngOnInit(): void {
		this.dataSource.data =
			this.trainingService.getCompletedOrCancelledExercises();
	}
}
