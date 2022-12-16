import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateTopTierEloBoost } from 'src/app/contracts/topTierEloBoosts/create-top-tier-elo-boost';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-top-tier-elo-boosts',
  templateUrl: './top-tier-elo-boosts.component.html',
  styleUrls: ['./top-tier-elo-boosts.component.scss'],
})
export class TopTierEloBoostsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdTopTierEloBoost(createdTopTierEloBoost: CreateTopTierEloBoost) {
    this.listComponents.getTopTierEloBoosts();
  }
}
