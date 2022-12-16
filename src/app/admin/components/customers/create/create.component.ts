import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCustomer } from 'src/app/contracts/customers/create-customer';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private customerService: CustomerService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdCustomer: EventEmitter<CreateCustomer> = new EventEmitter();

  create(
    txtName: HTMLInputElement,
    txtSurname: HTMLInputElement,
    txtNickname: HTMLInputElement,
    txtPassword: HTMLInputElement,
    txtMail: HTMLInputElement,
    txtPhoneNumber: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const createCustomer: CreateCustomer = new CreateCustomer();
    createCustomer.name = txtName.value;
    createCustomer.surname = txtSurname.value;
    createCustomer.nickname = txtNickname.value;
    createCustomer.password = txtPassword.value;
    createCustomer.mail = txtMail.value;
    createCustomer.phoneNumber = txtPhoneNumber.value;

    this.customerService.create(
      createCustomer,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Customer basariyla eklenmistir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdCustomer.emit(createCustomer);
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
