import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from '../models/exercise.model';

@Injectable({
	providedIn: 'root',
})
export class TrainingService {
	availableExercises: Exercise[] = [
		{ id: '1', name: 'Crunches', duration: 30, calories: 8 },
		{ id: '2', name: 'Touch Toes', duration: 100, calories: 30 },
		{ id: '3', name: 'Plank', duration: 60, calories: 70 },
		{ id: '4', name: 'Push-ups', duration: 50, calories: 90 },
	];

	runningExercise: Exercise | any;
	exercises: Exercise[] = [];

	exerciseChanged = new Subject<Exercise | null>();

	constructor() {}

	getAvailableExercise() {
		return this.availableExercises.slice();
	}

	startExercise(selectedId: string) {
		this.runningExercise = this.availableExercises.find((exercise) => {
			exercise.id === selectedId;
		});
		this.exerciseChanged.next({ ...this.runningExercise });
	}

	completeExercise() {
		this.exercises.push({
			...this.runningExercise,
			date: new Date(),
			state: 'completed',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	cancleExercise(progress: number) {
		this.exercises.push({
			...this.runningExercise,
			duration: (this.runningExercise.duration * progress) / 100,
			calories: (this.runningExercise.calories * progress) / 100,
			date: new Date(),
			state: 'cancelled',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	getRunningExercise() {
		return { ...this.runningExercise };
	}

	getCompletedOrCancelledExercises() {
		return this.exercises.slice();
	}
}
