import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Game } from 'src/app/contracts/list_game';
import { CreateTier } from 'src/app/contracts/tiers/create-tier';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { GameService } from 'src/app/services/common/models/game.service';
import { TierService } from 'src/app/services/common/models/tier.service';

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
    private tierService: TierService,
    private alertify: AlertifyService,
    private gameService: GameService
  ) {
    super(spinner);
  }
  async getGames() {
    const allGame: { games: List_Game[] } = await this.gameService.getGame();
    this.listOfGame = allGame.games;
  }
  async ngOnInit() {
    await this.getGames();
  }

  @Output() createdTier: EventEmitter<CreateTier> = new EventEmitter();

  create(txtName: HTMLInputElement, txtImage: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createTier: CreateTier = new CreateTier();
    createTier.name = txtName.value;
    createTier.image = txtImage.value;
    createTier.GameId = this.GameId;
    this.tierService.create(
      createTier,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Tier başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdTier.emit(createTier);
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
