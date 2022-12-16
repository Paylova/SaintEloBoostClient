import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateBooster } from 'src/app/contracts/boosters/create_booster';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-boosters',
  templateUrl: './boosters.component.html',
  styleUrls: ['./boosters.component.scss'],
})
export class BoostersComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdBooster(createdBooster: CreateBooster) {
    this.listComponents.getBoosters();
  }
}
