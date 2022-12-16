import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LorComponent } from './lor.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LorComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LorComponent }]),
  ],
})
export class LorModule {}
