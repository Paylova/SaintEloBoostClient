import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { List_Game } from 'src/app/contracts/list_game';
import { CreateRole } from 'src/app/contracts/roles/create-role';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { GameService } from 'src/app/services/common/models/game.service';
import { RoleService } from 'src/app/services/common/models/role.service';

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
    private roleService: RoleService,
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

  @Output() createdRole: EventEmitter<CreateRole> = new EventEmitter();

  create(txtName: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createRole: CreateRole = new CreateRole();
    createRole.name = txtName.value;
    createRole.GameId = this.GameId;
    this.roleService.create(
      createRole,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Role başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdRole.emit(createRole);
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
