import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TrainingService } from '@@training-service/training.service';

@Component({
	selector: 'app-training',
	templateUrl: './training.component.html',
	styleUrls: ['./training.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrainingComponent implements OnInit {
	constructor(private readonly trainingService: TrainingService) {}

	ngOnInit(): void {}
}
