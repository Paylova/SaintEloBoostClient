import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCharacterLevelBoost } from 'src/app/contracts/characterLevelBoosts/list-character-level-boost';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CharacterLevelBoostService } from 'src/app/services/common/models/character-level-boost.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private characterLevelBoostService: CharacterLevelBoostService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'price',
    'rank',
    'id',
    'Character',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListCharacterLevelBoost> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getCharacterLevelBoosts() {
    this.showSpinner(SpinnerType.BallAtom);

    const allCharacterLevelBoosts: {
      totalCount: number;
      characterLevelBoosts: ListCharacterLevelBoost[];
    } = await this.characterLevelBoostService.read(
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
    this.dataSource = new MatTableDataSource<ListCharacterLevelBoost>(
      allCharacterLevelBoosts.characterLevelBoosts
    );
    this.paginator.length = allCharacterLevelBoosts.totalCount;
  }

  async pageChanged() {
    await this.getCharacterLevelBoosts();
  }

  async ngOnInit() {
    await this.getCharacterLevelBoosts();
  }
}
