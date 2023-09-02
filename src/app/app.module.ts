import { APP_INITIALIZER, NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from '@@shared/material/material.module';
import { TrainingModule } from '@@features/training/training.module';
import { SignupModule } from '@@features/signup/signup.module';
import { LoginModule } from '@@features/login/login.module';
import { SidenavModule } from '@@shared/sidenav/sidenav.module';
import { HeaderModule } from '@@shared/header/header.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from '@@shared/store/auth/auth.reducer';
import { AuthEffects } from '@@shared/store/auth/auth.effects';
import { environment } from 'src/environments/environment';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SpinnerComponent } from '@@shared/spinner/spinner/spinner.component';
import { SpinnerInterceptor } from '@@shared/interceptors/spinner.interceptor';
import { JwtInterceptor } from '@@shared/interceptors/jwt.interceptor';
import { StorageService } from '@@shared/services/storage.service';
import {
	postByIdReducer,
	postReducer,
} from '@@shared/store/posts/post.reducer';
import { PostEffects } from '@@shared/store/posts/post.effects';
import { FooterModule } from '@@shared/footer/footer.module';
import { NotFoundModule } from '@@shared/not-found/not-found.module';

@NgModule({
	declarations: [AppComponent, SpinnerComponent],
	imports: [
		BrowserAnimationsModule,
		MaterialModule,
		FlexLayoutModule,
		FormsModule,
		ReactiveFormsModule,
		TrainingModule,
		SignupModule,
		LoginModule,
		SidenavModule,
		HeaderModule,
		FooterModule,
		NotFoundModule,
		AppRoutingModule,
		HttpClientModule,
		ToastrModule.forRoot({
			positionClass: 'toast-top-center',
			timeOut: 2000,
			progressBar: true,
			tapToDismiss: true,
		}),
		StoreModule.forRoot({
			auth: authReducer,
			post: postReducer,
			postId: postByIdReducer,
		}),
		EffectsModule.forRoot([AuthEffects, PostEffects]),
		!environment.production
			? [StoreDevtoolsModule.instrument({ maxAge: 25 })]
			: [],
	],
	providers: [
		{
			provide: APP_INITIALIZER,
			useFactory: (storage: StorageService) => {
				return () => {
					storage.getUserFromStorage();
				};
			},
			multi: true,
			deps: [StorageService],
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: JwtInterceptor,
			multi: true,
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SpinnerInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
