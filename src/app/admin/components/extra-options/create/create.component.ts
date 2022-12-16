import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateExtraOption } from 'src/app/contracts/extraOptions/create-extra-option';
import { ListService } from 'src/app/contracts/services/list-service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ExtraOptionService } from 'src/app/services/common/models/extra-option.service';
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
    private extraOptionService: ExtraOptionService,
    private serviceService: ServiceService,
    private alertify: AlertifyService
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

  @Output() createdExtraOption: EventEmitter<CreateExtraOption> =
    new EventEmitter();

  create(txtName: HTMLInputElement, txtPrice: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createExtraOption: CreateExtraOption = new CreateExtraOption();
    createExtraOption.name = txtName.value;
    createExtraOption.price = parseFloat(txtPrice.value);
    createExtraOption.ServiceId = this.ServiceId;
    this.extraOptionService.create(
      createExtraOption,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Extra Option başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdExtraOption.emit(createExtraOption);
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
