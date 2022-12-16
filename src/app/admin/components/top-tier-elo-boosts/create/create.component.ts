import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateLevelBoost } from 'src/app/contracts/levelBoosts/create-level-boost';
import { ListService } from 'src/app/contracts/services/list-service';
import { CreateTopTierEloBoost } from 'src/app/contracts/topTierEloBoosts/create-top-tier-elo-boost';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ServiceService } from 'src/app/services/common/models/service.service';
import { TopTierEloBoostService } from 'src/app/services/common/models/top-tier-elo-boost.service';

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
    private topTierEloBoost: TopTierEloBoostService
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

  @Output() createdTopTierEloBoost: EventEmitter<CreateTopTierEloBoost> =
    new EventEmitter();

  create(
    txtStart: HTMLInputElement,
    txtEnd: HTMLInputElement,
    txtPrice: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const createTopTierEloBoost: CreateTopTierEloBoost =
      new CreateTopTierEloBoost();
    createTopTierEloBoost.start = parseInt(txtStart.value);
    createTopTierEloBoost.end = parseInt(txtEnd.value);
    createTopTierEloBoost.price = parseInt(txtPrice.value);
    createTopTierEloBoost.ServiceId = this.ServiceId;
    this.topTierEloBoost.create(
      createTopTierEloBoost,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Top Tier Elo Boost başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdTopTierEloBoost.emit(createTopTierEloBoost);
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
