import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValorantComponent } from './valorant.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ValorantComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: ValorantComponent }]),
  ],
})
export class ValorantModule {}
