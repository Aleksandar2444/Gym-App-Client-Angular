import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { SidenavComponent } from '@@shared/sidenav/components/sidenav/sidenav.component';
import { MaterialModule } from '@@shared/material/material.module';

@NgModule({
	declarations: [SidenavComponent],
	imports: [CommonModule, SidenavRoutingModule, MaterialModule],
	exports: [SidenavComponent],
})
export class SidenavModule {}
