import { Post, SelectedPost } from '@@features/posts/models/model';
import {
	Country,
	UserData,
	UserInfoResponse,
	UserProfileForm,
} from '@@features/user-profile/models/model';
import { BaseComponent } from '@@shared/base-component/base/base.component';
import { CoreService } from '@@shared/services/core.service';
import { PostsService } from '@@shared/services/post.service';
import { postDeleteRequest } from '@@shared/store/posts/post.actions';
import {
	ChangeDetectionStrategy,
	Component,
	Input,
	OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, map, takeUntil } from 'rxjs';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends BaseComponent implements OnInit {
	@Input() post: Post | SelectedPost;

	readonly posts$ = new BehaviorSubject<Post[]>([]);

	userProfileForm: FormGroup<UserProfileForm>;
	isFormSubmitted = false;
	editMode = false;
	userDataObj: UserData;

	user: UserInfoResponse;
	postArray: Post[];

	dummyDataCountries: Country[] = [
		{ value: 'mk', viewValue: 'Macedonia' },
		{ value: 'ru', viewValue: 'Russia' },
		{ value: 'ca', viewValue: 'Canada' },
		{ value: 'au', viewValue: 'Australia' },
		{ value: 'no', viewValue: 'Norway' },
	];

	constructor(
		private readonly coreService: CoreService,
		private readonly postsService: PostsService,
		private readonly router: Router,
		private readonly store: Store,
		private readonly ngxSmartModalService: NgxSmartModalService
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();
		this.onInitFindUser();
	}

	getValuesFromPost() {
		this.posts$
			.pipe(
				takeUntil(this.destroy$),
				map((value) => {
					this.postArray = [...value];
				})
			)
			.subscribe();
	}

	onInitFindUser() {
		this.coreService
			.findUserById()
			.pipe(
				takeUntil(this.destroy$),
				map((value: UserInfoResponse) => {
					this.user = value;

					if (this.user) {
						// When on posts by user page
						this.postsService
							.getPostsByUser()
							.pipe(
								takeUntil(this.destroy$),
								map((value) => {
									this.posts$.next(value as Post[]);
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe();

		this.getValuesFromPost();
	}

	onPostSelect(post: string) {
		this.router.navigate(['posts', post]);
	}

	onPostEdit(event: Event, post: Post) {
		event.stopImmediatePropagation();
		this.postsService.setPostToEdit(post);
	}

	onPostDelete(event: Event, post: Post) {
		event.stopImmediatePropagation();

		this.store.dispatch(
			postDeleteRequest({
				payload: post._id,
			})
		);
	}

	initForm() {
		this.userProfileForm = new FormGroup<UserProfileForm>({
			gymNickname: new FormControl<string>('', {
				validators: [Validators.minLength(2)],
				nonNullable: true,
			}),
			country: new FormControl<string>('', {
				nonNullable: true,
			}),
			city: new FormControl<string>('', {
				validators: [Validators.minLength(2)],
				nonNullable: true,
			}),
			about: new FormControl<string>('', {
				nonNullable: true,
			}),
		});
	}

	onFormSubmit() {
		this.isFormSubmitted = true;
		if (this.userProfileForm.invalid) return;
	}

	onEdit() {
		this.editMode = true;
		this.ngxSmartModalService.open('myModal');

		this.userProfileForm.setValue({
			gymNickname: this.userProfileForm.value.gymNickname!,
			country: this.userProfileForm.value.country!,
			city: this.userProfileForm.value.city!,
			about: this.userProfileForm.value.about!,
		});
	}

	addData() {
		let userData = this.userProfileForm.controls;

		const newData = {
			gymNickname: userData.gymNickname.value,
			country: userData.country.value,
			city: userData.city.value,
			about: userData.about.value,
		};

		this.userDataObj = newData;
		this.userProfileForm.reset();
		this.ngxSmartModalService.close('myModal');
	}

	closeModal(userID: string) {
		this.userProfileForm.reset();
		this.editMode = false;
		this.ngxSmartModalService.close(userID);
	}
}
