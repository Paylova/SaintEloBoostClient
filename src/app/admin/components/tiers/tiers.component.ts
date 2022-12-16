import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateTier } from 'src/app/contracts/tiers/create-tier';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-tiers',
  templateUrl: './tiers.component.html',
  styleUrls: ['./tiers.component.scss'],
})
export class TiersComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;
  createdTier(createdTier: CreateTier) {
    this.listComponents.getTiers();
  }
}
