import { NgModule } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import { MatListModule } from '@angular/material/list';

@NgModule({
	declarations: [],
	imports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatProgressBarModule,
		MatPasswordStrengthModule,
		MatListModule,
	],
	exports: [
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatSidenavModule,
		MatToolbarModule,
		MatIconModule,
		MatProgressBarModule,
		MatPasswordStrengthModule,
		MatListModule,
	],
})
export class MaterialModule {}
