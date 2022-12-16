import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListExtraOption } from 'src/app/contracts/extraOptions/list-extra-option';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ExtraOptionService } from 'src/app/services/common/models/extra-option.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private extraOptionService: ExtraOptionService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
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
  dataSource: MatTableDataSource<ListExtraOption> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getExtraOptions() {
    this.showSpinner(SpinnerType.BallAtom);

    const allExtraOptions: {
      totalCount: number;
      extraOptions: ListExtraOption[];
    } = await this.extraOptionService.read(
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
    this.dataSource = new MatTableDataSource<ListExtraOption>(
      allExtraOptions.extraOptions
    );
    this.paginator.length = allExtraOptions.totalCount;
  }

  async pageChanged() {
    await this.getExtraOptions();
  }

  async ngOnInit() {
    await this.getExtraOptions();
  }
}
