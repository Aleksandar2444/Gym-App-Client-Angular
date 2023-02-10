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
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';

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
		MatTabsModule,
		MatCardModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatTableModule,
		MatMenuModule,
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
		MatTabsModule,
		MatCardModule,
		MatSelectModule,
		MatProgressSpinnerModule,
		MatDialogModule,
		MatTableModule,
		MatMenuModule,
	],
})
export class MaterialModule {}
