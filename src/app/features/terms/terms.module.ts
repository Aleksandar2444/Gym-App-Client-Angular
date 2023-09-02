import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TermsRoutingModule } from './terms-routing.module';
import { TermsComponent } from './components/terms/terms.component';

@NgModule({
	declarations: [TermsComponent],
	imports: [CommonModule, TermsRoutingModule],
	exports: [TermsComponent],
})
export class TermsModule {}
