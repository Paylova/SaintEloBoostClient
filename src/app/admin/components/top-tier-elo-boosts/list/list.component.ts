import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListTopTierEloBoost } from 'src/app/contracts/topTierEloBoosts/list-top-tier-elo-boost';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { TopTierEloBoostService } from 'src/app/services/common/models/top-tier-elo-boost.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private topTierEloBoostService: TopTierEloBoostService,
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
  dataSource: MatTableDataSource<ListTopTierEloBoost> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getTopTierEloBoosts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allTopTierEloBoosts: {
      totalCount: number;
      topTierEloBoosts: ListTopTierEloBoost[];
    } = await this.topTierEloBoostService.read(
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
    this.dataSource = new MatTableDataSource<ListTopTierEloBoost>(
      allTopTierEloBoosts.topTierEloBoosts
    );
    this.paginator.length = allTopTierEloBoosts.totalCount;
    console.log(allTopTierEloBoosts.topTierEloBoosts[0]);
  }

  async pageChanged() {
    await this.getTopTierEloBoosts();
  }
  async ngOnInit() {
    await this.getTopTierEloBoosts();
  }
}
