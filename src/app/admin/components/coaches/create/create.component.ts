import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCoach } from 'src/app/contracts/coaches/create-coach';
import { List_Employee } from 'src/app/contracts/list_employee';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CoachService } from 'src/app/services/common/models/coach.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

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
    private coachService: CoachService,
    private employeeService: EmployeeService,
    private alertify: AlertifyService
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

  @Output() createdCoach: EventEmitter<CreateCoach> = new EventEmitter();

  create() {
    this.showSpinner(SpinnerType.BallAtom);
    const createCoach: CreateCoach = new CreateCoach();
    createCoach.EmployeeId = this.EmployeeId;

    this.coachService.create(
      createCoach,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Coach başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdCoach.emit(createCoach);
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
