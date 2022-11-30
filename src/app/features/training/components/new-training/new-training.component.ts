import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Exercise } from '@@exercise/exercise.model';
import { TrainingService } from '@@training-service/training.service';

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewTrainingComponent implements OnInit {
	exercises: Exercise[] = [];

	constructor(private readonly trainingService: TrainingService) {}

	ngOnInit(): void {
		this.exercises = this.trainingService.getAvailableExercise();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}
}
