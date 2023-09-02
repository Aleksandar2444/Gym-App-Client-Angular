import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooterRoutingModule } from './footer-routing.module';
import { MaterialModule } from '@@shared/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
	declarations: [FooterComponent],
	imports: [
		CommonModule,
		FooterRoutingModule,
		MaterialModule,
		FlexLayoutModule,
	],
	exports: [FooterComponent],
})
export class FooterModule {}
