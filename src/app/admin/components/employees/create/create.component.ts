import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Employee } from 'src/app/contracts/create_employee';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private employeeService: EmployeeService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }

  ngOnInit(): void {}

  @Output() createdEmployee: EventEmitter<Create_Employee> = new EventEmitter();

  create(
    txtName: HTMLInputElement,
    txtSurname: HTMLInputElement,
    txtNickname: HTMLInputElement,
    txtPassword: HTMLInputElement,
    txtMail: HTMLInputElement,
    txtPhoneNumber: HTMLInputElement,
    txtiban: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_employee: Create_Employee = new Create_Employee();
    create_employee.name = txtName.value;
    create_employee.surname = txtSurname.value;
    create_employee.nickname = txtNickname.value;
    create_employee.password = txtPassword.value;
    create_employee.mail = txtMail.value;
    create_employee.phoneNumber = txtPhoneNumber.value;
    create_employee.iban = txtiban.value;

    this.employeeService.create(
      create_employee,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Employee basariyla eklenmistir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdEmployee.emit(create_employee);
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
