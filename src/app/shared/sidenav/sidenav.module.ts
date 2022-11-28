import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidenavRoutingModule } from './sidenav-routing.module';
import { ComponentsComponent } from './components/components.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';


@NgModule({
  declarations: [
    ComponentsComponent,
    SidenavComponent
  ],
  imports: [
    CommonModule,
    SidenavRoutingModule
  ]
})
export class SidenavModule { }
