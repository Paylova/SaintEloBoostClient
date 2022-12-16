import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Employee } from 'src/app/contracts/list_employee';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { EmployeeService } from 'src/app/services/common/models/employee.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private employeeService: EmployeeService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'nickname',
    'name',
    'surname',
    'password',
    'phoneNumber',
    'mail',
    'iban',
    'id',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Employee> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getEmployees() {
    this.showSpinner(SpinnerType.BallAtom);

    const allEmployees: { totalCount: number; employees: List_Employee[] } =
      await this.employeeService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.BallAtom),
        (errorMessage) =>
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          })
      );

    this.dataSource = new MatTableDataSource<List_Employee>(
      allEmployees.employees
    );
    this.paginator.length = allEmployees.totalCount;
  }

  async pageChanged() {
    await this.getEmployees();
  }

  async ngOnInit() {
    await this.getEmployees();
  }
}
