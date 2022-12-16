import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListFactor } from 'src/app/contracts/factors/list-factor';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { FactorService } from 'src/app/services/common/models/factor.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private factorService: FactorService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'key',
    'value',
    'id',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListFactor> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getFactors() {
    this.showSpinner(SpinnerType.BallAtom);

    const allFactors: { totalCount: number; factors: ListFactor[] } =
      await this.factorService.read(
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
    this.dataSource = new MatTableDataSource<ListFactor>(allFactors.factors);
    this.paginator.length = allFactors.totalCount;
  }

  async pageChanged() {
    await this.getFactors();
  }

  async ngOnInit() {
    await this.getFactors();
  }
}
