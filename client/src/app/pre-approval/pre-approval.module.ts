import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PreApprovalComponent } from './pre-approval.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    PreApprovalComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [PreApprovalComponent]
})
export class PreApprovalModule { }
