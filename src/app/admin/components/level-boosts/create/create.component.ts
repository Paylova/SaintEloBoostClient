import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateLevelBoost } from 'src/app/contracts/levelBoosts/create-level-boost';
import { ListService } from 'src/app/contracts/services/list-service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { LevelBoostService } from 'src/app/services/common/models/level-boost.service';
import { ServiceService } from 'src/app/services/common/models/service.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfService: Array<ListService> = null;
  selectedOptions: Array<ListService> = [];
  ServiceId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private serviceService: ServiceService,
    private alertify: AlertifyService,
    private levelBoost: LevelBoostService
  ) {
    super(spinner);
  }
  async getService() {
    const allService: { services: ListService[] } =
      await this.serviceService.getServices();
    this.listOfService = allService.services;
  }

  async ngOnInit() {
    await this.getService();
  }

  @Output() createdLevelBoost: EventEmitter<CreateLevelBoost> =
    new EventEmitter();

  create(
    txtStart: HTMLInputElement,
    txtEnd: HTMLInputElement,
    txtPrice: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const createLevelBoost: CreateLevelBoost = new CreateLevelBoost();
    createLevelBoost.start = parseInt(txtStart.value);
    createLevelBoost.end = parseInt(txtEnd.value);
    createLevelBoost.price = parseFloat(txtPrice.value);
    createLevelBoost.ServiceId = this.ServiceId;
    this.levelBoost.create(
      createLevelBoost,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Level Boost başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdLevelBoost.emit(createLevelBoost);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }

  async onNgModelChange(event) {
    this.ServiceId = event.id;
  }
}
