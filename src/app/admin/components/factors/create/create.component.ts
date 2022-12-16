import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateFactor } from 'src/app/contracts/factors/create-factor';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FactorService } from 'src/app/services/common/models/factor.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private factorService: FactorService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdFactor: EventEmitter<CreateFactor> = new EventEmitter();

  create(txtKey: HTMLInputElement, txtValue: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createFactor: CreateFactor = new CreateFactor();
    createFactor.key = txtKey.value;
    createFactor.value = parseFloat(txtValue.value);

    this.factorService.create(
      createFactor,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Factor başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdFactor.emit(createFactor);
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
}
