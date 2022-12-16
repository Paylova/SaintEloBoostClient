import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LolComponent } from './lol.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [LolComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{ path: '', component: LolComponent }]),
  ],
})
export class LolModule {}
