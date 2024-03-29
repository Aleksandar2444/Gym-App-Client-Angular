import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrivacyPolicyRoutingModule } from './privacy-policy-routing.module';
import { PrivacyPolicyComponent } from './components/privacy-policy/privacy-policy.component';

@NgModule({
	declarations: [PrivacyPolicyComponent],
	imports: [CommonModule, PrivacyPolicyRoutingModule],
	exports: [PrivacyPolicyComponent],
})
export class PrivacyPolicyModule {}
