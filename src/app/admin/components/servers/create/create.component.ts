import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Game } from 'src/app/contracts/list_game';
import { CreateServer } from 'src/app/contracts/servers/create-server';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { GameService } from 'src/app/services/common/models/game.service';
import { ServerService } from 'src/app/services/common/models/server.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfGame: Array<List_Game> = null;
  selectedOptions: Array<List_Game> = [];
  GameId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private serverService: ServerService,
    private alertify: AlertifyService,
    private gameService: GameService
  ) {
    super(spinner);
  }
  async getGame() {
    const allGame: { games: List_Game[] } = await this.gameService.getGame();
    this.listOfGame = allGame.games;
  }
  async ngOnInit() {
    await this.getGame();
  }

  @Output() createdServer: EventEmitter<CreateServer> = new EventEmitter();

  create(txtName: HTMLInputElement, txtFactor: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createServer: CreateServer = new CreateServer();
    createServer.name = txtName.value;
    createServer.factor = parseInt(txtFactor.value);
    createServer.GameId = this.GameId;
    this.serverService.create(
      createServer,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Server başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdServer.emit(createServer);
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
    this.GameId = event.id;
  }
}
