import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Game } from 'src/app/contracts/list_game';
import { CreateService } from 'src/app/contracts/services/create-service';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { GameService } from 'src/app/services/common/models/game.service';
import { ServiceService } from 'src/app/services/common/models/service.service';

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
    private serviceService: ServiceService,
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

  @Output() createdService: EventEmitter<CreateService> = new EventEmitter();

  create(txtName: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createService: CreateService = new CreateService();
    createService.name = txtName.value;
    createService.GameId = this.GameId;
    this.serviceService.create(
      createService,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Service başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdService.emit(createService);
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
