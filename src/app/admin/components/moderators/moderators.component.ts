import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateModerator } from 'src/app/contracts/moderators/create-moderator';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-moderators',
  templateUrl: './moderators.component.html',
  styleUrls: ['./moderators.component.scss'],
})
export class ModeratorsComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdModerator(createdModerator: CreateModerator) {
    this.listComponents.getModerators();
  }
}
