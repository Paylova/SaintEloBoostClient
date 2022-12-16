import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListDivision } from 'src/app/contracts/divisions/list-division';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DivisionService } from 'src/app/services/common/models/division.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private divisionService: DivisionService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'price',
    'rank',
    'lp',
    'image',
    'id',
    'Tier',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListDivision> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getDivisions() {
    this.showSpinner(SpinnerType.BallAtom);

    const allDivisions: { totalCount: number; divisions: ListDivision[] } =
      await this.divisionService.read(
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
    this.dataSource = new MatTableDataSource<ListDivision>(
      allDivisions.divisions
    );
    this.paginator.length = allDivisions.totalCount;
  }

  async pageChanged() {
    await this.getDivisions();
  }

  async ngOnInit() {
    await this.getDivisions();
  }
}
