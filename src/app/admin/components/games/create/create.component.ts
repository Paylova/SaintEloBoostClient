import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Game } from 'src/app/contracts/create_game';
import { List_Company } from 'src/app/contracts/list_company';

import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CompanyService } from 'src/app/services/common/models/company.service';
import { GameService } from 'src/app/services/common/models/game.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfCompany: Array<List_Company> = null;
  selectedOptions: Array<List_Company> = [];
  CompanyId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private gameService: GameService,
    private alertify: AlertifyService,
    private companyService: CompanyService
  ) {
    super(spinner);
  }
  async getCompany() {
    const allCompany: { companys: List_Company[] } =
      await this.companyService.getCompany();
    this.listOfCompany = allCompany.companys;
  }
  async ngOnInit() {
    await this.getCompany();
  }

  @Output() createdGame: EventEmitter<Create_Game> = new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const create_game: Create_Game = new Create_Game();
    create_game.name = name.value;
    create_game.CompanyId = this.CompanyId;

    this.gameService.create(
      create_game,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Oyun başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdGame.emit(create_game);
      },
      (errorMessage) => {
        this.alertify.message(errorMessage, {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight,
        });
      }
    );
  }
  async onNgModelChange(event) {
    this.CompanyId = event.id;
  }
}
