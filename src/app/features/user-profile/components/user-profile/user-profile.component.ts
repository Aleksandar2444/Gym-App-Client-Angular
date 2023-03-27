import { Post, SelectedPost } from '@@features/posts/models/model';
import {
	Country,
	UserDataResponse,
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
import { UserProfileService } from '@@features/user-profile/service/user-profile.service';

@Component({
	selector: 'app-user-profile',
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserProfileComponent extends BaseComponent implements OnInit {
	@Input() post: Post | SelectedPost;

	readonly posts$ = new BehaviorSubject<Post[]>([]);
	readonly countries$ = new BehaviorSubject<Country[]>([]);

	userProfileForm: FormGroup<UserProfileForm>;
	isFormSubmitted = false;
	editMode = false;

	user: UserDataResponse;
	userData: UserDataResponse;
	postArray: Post[];
	countriesArray: any[];

	constructor(
		private readonly coreService: CoreService,
		private readonly postsService: PostsService,
		private readonly router: Router,
		private readonly store: Store,
		private readonly ngxSmartModalService: NgxSmartModalService,
		private readonly userProfileService: UserProfileService
	) {
		super();
	}

	ngOnInit(): void {
		this.initForm();
		this.onInitFindUser();
	}

	onInitFindUser() {
		this.coreService
			.findUserById()
			.pipe(
				takeUntil(this.destroy$),
				map((value: UserDataResponse) => {
					this.user = value;

					if (this.user) {
						this.postsService
							.getPostsByUser()
							.pipe(
								takeUntil(this.destroy$),
								map((value) => {
									this.posts$.next(value as Post[]);
									this.postArray = this.posts$.value;
								})
							)
							.subscribe();

						this.userProfileService
							.getAllCountries()
							.pipe(
								takeUntil(this.destroy$),
								map((value) => {
									this.countries$.next(value as any);
									this.countriesArray = this.countries$.value;
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe();
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
			gymNickname: this.user.gymNickname!,
			country: this.user.country!,
			city: this.user.city!,
			about: this.user.about!,
		});
	}

	updateUser() {
		const { gymNickname, country, city, about } =
			this.userProfileForm.value;

		this.coreService
			.findUserById()
			.pipe(
				takeUntil(this.destroy$),
				map((value: UserDataResponse) => {
					if (value) {
						this.userProfileService
							.updateUserProfile(
								value._id,
								gymNickname!,
								country!,
								city!,
								about!
							)
							.pipe(
								takeUntil(this.destroy$),
								map((value: UserDataResponse) => {
									this.userData = value;
								})
							)
							.subscribe();
					}
				})
			)
			.subscribe();

		this.ngxSmartModalService.close('myModal');
	}

	closeModal(userID: string) {
		this.userProfileForm.reset();
		this.editMode = false;
		this.ngxSmartModalService.close(userID);
	}
}
