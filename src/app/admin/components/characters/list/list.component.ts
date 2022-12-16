import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCharacter } from 'src/app/contracts/character/list-character';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CharacterService } from 'src/app/services/common/models/character.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private characterService: CharacterService,
    private alertifyService: AlertifyService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'id',
    'Role',
    'isActive',
    'isDelete',
    'createdDate',
    'updatedDate',
    'edit',
    'delete',
  ];
  dataSource: MatTableDataSource<ListCharacter> = null;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getCharacters() {
    this.showSpinner(SpinnerType.BallAtom);

    const allCharacters: { totalCount: number; characters: ListCharacter[] } =
      await this.characterService.read(
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
    this.dataSource = new MatTableDataSource<ListCharacter>(
      allCharacters.characters
    );
    this.paginator.length = allCharacters.totalCount;
  }

  async pageChanged() {
    await this.getCharacters();
  }

  async ngOnInit() {
    await this.getCharacters();
  }
}
