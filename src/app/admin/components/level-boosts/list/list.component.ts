import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListLevelBoost } from 'src/app/contracts/levelBoosts/list-level-boost';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { LevelBoostService } from 'src/app/services/common/models/level-boost.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private levelBoostService: LevelBoostService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'start',
    'end',
    'price',
    'id',
    'Service',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListLevelBoost> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getLevelBoosts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allLevelBoosts: {
      totalCount: number;
      levelBoosts: ListLevelBoost[];
    } = await this.levelBoostService.read(
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
    this.dataSource = new MatTableDataSource<ListLevelBoost>(
      allLevelBoosts.levelBoosts
    );
    this.paginator.length = allLevelBoosts.totalCount;
  }

  async pageChanged() {
    await this.getLevelBoosts();
  }
  async ngOnInit() {
    await this.getLevelBoosts();
  }
}
