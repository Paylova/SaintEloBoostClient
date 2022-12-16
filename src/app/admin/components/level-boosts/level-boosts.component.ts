import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateLevelBoost } from 'src/app/contracts/levelBoosts/create-level-boost';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-level-boosts',
  templateUrl: './level-boosts.component.html',
  styleUrls: ['./level-boosts.component.scss'],
})
export class LevelBoostsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdLevelBoost(createdLevelBoost: CreateLevelBoost) {
    this.listComponents.getLevelBoosts();
  }
}
