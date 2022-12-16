import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeModule } from './home/home.module';
import { LolModule } from './lol/lol.module';
import { ValorantModule } from './valorant/valorant.module';
import { TftModule } from './tft/tft.module';
import { BasketModule } from './basket/basket.module';
import { LorModule } from './lor/lor.module';
import { WildriftModule } from './wildrift/wildrift.module';
import { ApexModule } from './apex/apex.module';
import { CsgoModule } from './csgo/csgo.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeModule,
    LolModule,
    ValorantModule,
    TftModule,
    BasketModule,
    LorModule,
    WildriftModule,
    ApexModule,
    CsgoModule,
  ],
})
export class ComponentsModule {}
