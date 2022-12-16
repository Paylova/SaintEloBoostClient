import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApexComponent } from './apex.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ApexComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ApexComponent }]),
  ],
})
export class ApexModule {}
