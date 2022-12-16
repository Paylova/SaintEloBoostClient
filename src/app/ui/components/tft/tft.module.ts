import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TftComponent } from './tft.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TftComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: TftComponent }]),
  ],
})
export class TftModule {}
