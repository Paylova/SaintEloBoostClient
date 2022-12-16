import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateDivision } from 'src/app/contracts/divisions/create-division';
import { ListTier } from 'src/app/contracts/tiers/list-tier';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DivisionService } from 'src/app/services/common/models/division.service';
import { TierService } from 'src/app/services/common/models/tier.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfTier: Array<ListTier> = null;
  selectedOptions: Array<ListTier> = [];
  TierId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private divisionService: DivisionService,
    private alertify: AlertifyService,
    private tierService: TierService
  ) {
    super(spinner);
  }
  async getTier() {
    const allTier: { tiers: ListTier[] } = await this.tierService.getTier();
    this.listOfTier = allTier.tiers;
  }
  async ngOnInit() {
    await this.getTier();
  }

  @Output() createdDivision: EventEmitter<CreateDivision> = new EventEmitter();

  create(
    txtName: HTMLInputElement,
    txtPrice: HTMLInputElement,
    txtRank: HTMLInputElement,
    txtLP: HTMLInputElement,
    txtImage: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const createDivision: CreateDivision = new CreateDivision();
    createDivision.TierId = this.TierId;
    createDivision.name = txtName.value;
    createDivision.image = txtImage.value;
    createDivision.lp = txtLP.value;
    createDivision.price = parseInt(txtPrice.value);
    createDivision.rank = parseInt(txtRank.value);

    this.divisionService.create(
      createDivision,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Division başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdDivision.emit(createDivision);
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
    this.TierId = event.id;
  }
}
