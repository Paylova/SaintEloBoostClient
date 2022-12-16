import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsgoComponent } from './csgo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [CsgoComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: CsgoComponent }]),
  ],
})
export class CsgoModule {}
