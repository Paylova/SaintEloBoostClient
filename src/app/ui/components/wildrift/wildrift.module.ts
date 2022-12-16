import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WildriftComponent } from './wildrift.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [WildriftComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: WildriftComponent }]),
  ],
})
export class WildriftModule {}
