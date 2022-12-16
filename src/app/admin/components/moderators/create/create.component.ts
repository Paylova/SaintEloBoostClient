import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Employee } from 'src/app/contracts/list_employee';
import { CreateModerator } from 'src/app/contracts/moderators/create-moderator';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';
import { ModeratorService } from 'src/app/services/common/models/moderator.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfEmployee: Array<List_Employee> = null;
  selectedOptions: Array<List_Employee> = [];
  EmployeeId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private employeeService: EmployeeService,
    private alertify: AlertifyService,
    private moderatorService: ModeratorService
  ) {
    super(spinner);
  }
  async getEmployee() {
    const allEmployee: { employees: List_Employee[] } =
      await this.employeeService.getEmployee();
    this.listOfEmployee = allEmployee.employees;
  }
  async ngOnInit() {
    await this.getEmployee();
  }

  @Output() createdModerator: EventEmitter<CreateModerator> =
    new EventEmitter();

  create(txtAuthority: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createModerator: CreateModerator = new CreateModerator();
    createModerator.EmployeeId = this.EmployeeId;
    createModerator.authority = txtAuthority.value;

    this.moderatorService.create(
      createModerator,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Moderator başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdModerator.emit(createModerator);
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
    this.EmployeeId = event.id;
  }
}
