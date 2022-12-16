import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateBooster } from 'src/app/contracts/boosters/create_booster';
import { List_Employee } from 'src/app/contracts/list_employee';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { BoosterService } from 'src/app/services/common/models/booster.service';
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
    private boosterService: BoosterService,
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

  @Output() createdBooster: EventEmitter<CreateBooster> = new EventEmitter();

  create() {
    this.showSpinner(SpinnerType.BallAtom);
    const createBooster: CreateBooster = new CreateBooster();
    createBooster.EmployeeId = this.EmployeeId;

    this.boosterService.create(
      createBooster,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Booster başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdBooster.emit(createBooster);
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
