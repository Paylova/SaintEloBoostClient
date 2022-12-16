import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCustomer } from 'src/app/contracts/customers/list-customer';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CustomerService } from 'src/app/services/common/models/customer.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private customerService: CustomerService,
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
    'id',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListCustomer> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getCustomers() {
    this.showSpinner(SpinnerType.BallAtom);

    const allCustomers: { totalCount: number; customers: ListCustomer[] } =
      await this.customerService.read(
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

    this.dataSource = new MatTableDataSource<ListCustomer>(
      allCustomers.customers
    );
    this.paginator.length = allCustomers.totalCount;
  }

  async pageChanged() {
    await this.getCustomers();
  }

  async ngOnInit() {
    await this.getCustomers();
  }
}
