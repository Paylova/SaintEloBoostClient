import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCharacterLevelBoost } from 'src/app/contracts/characterLevelBoosts/create-character-level-boost';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-character-level-boosts',
  templateUrl: './character-level-boosts.component.html',
  styleUrls: ['./character-level-boosts.component.scss'],
})
export class CharacterLevelBoostsComponent
  extends BaseComponent
  implements OnInit
{
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }

  @ViewChild(ListComponent) listComponents: ListComponent;
  createdCharacterLevelBoost(
    createdCharacterLevelBoost: CreateCharacterLevelBoost
  ) {
    this.listComponents.getCharacterLevelBoosts();
  }
}
