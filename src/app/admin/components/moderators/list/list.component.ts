import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListModerator } from 'src/app/contracts/moderators/list-moderator';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { ModeratorService } from 'src/app/services/common/models/moderator.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private moderatorService: ModeratorService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'authority',
    'id',
    'Employee',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListModerator> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getModerators() {
    this.showSpinner(SpinnerType.BallAtom);

    const allModerators: { totalCount: number; moderators: ListModerator[] } =
      await this.moderatorService.read(
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
    this.dataSource = new MatTableDataSource<ListModerator>(
      allModerators.moderators
    );
    this.paginator.length = allModerators.totalCount;
  }

  async pageChanged() {
    await this.getModerators();
  }
  async ngOnInit() {
    await this.getModerators();
  }
}
