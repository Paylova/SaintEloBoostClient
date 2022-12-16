import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListBooster } from 'src/app/contracts/boosters/list_booster';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { BoosterService } from 'src/app/services/common/models/booster.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private boosterService: BoosterService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'Employee',
    'id',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListBooster> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getBoosters() {
    this.showSpinner(SpinnerType.BallAtom);

    const allBoosters: { totalCount: number; boosters: ListBooster[] } =
      await this.boosterService.read(
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
    this.dataSource = new MatTableDataSource<ListBooster>(allBoosters.boosters);
    this.paginator.length = allBoosters.totalCount;
  }

  async pageChanged() {
    await this.getBoosters();
  }

  async ngOnInit() {
    await this.getBoosters();
  }
}
