import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCoach } from 'src/app/contracts/coaches/list-coach';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CoachService } from 'src/app/services/common/models/coach.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private coachService: CoachService,
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
  dataSource: MatTableDataSource<ListCoach> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getCoaches() {
    this.showSpinner(SpinnerType.BallAtom);

    const allCoaches: { totalCount: number; coaches: ListCoach[] } =
      await this.coachService.read(
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
    this.dataSource = new MatTableDataSource<ListCoach>(allCoaches.coaches);
    this.paginator.length = allCoaches.totalCount;
  }

  async pageChanged() {
    await this.getCoaches();
  }
  async ngOnInit() {
    await this.getCoaches();
  }
}
