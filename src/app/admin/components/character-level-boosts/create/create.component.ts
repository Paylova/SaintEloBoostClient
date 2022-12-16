import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { ListCharacter } from 'src/app/contracts/character/list-character';
import { CreateCharacterLevelBoost } from 'src/app/contracts/characterLevelBoosts/create-character-level-boost';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CharacterLevelBoostService } from 'src/app/services/common/models/character-level-boost.service';
import { CharacterService } from 'src/app/services/common/models/character.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfCharacter: Array<ListCharacter> = null;
  selectedOptions: Array<ListCharacter> = [];
  CharacterId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private characterService: CharacterService,
    private characterLevelBoostService: CharacterLevelBoostService,
    private alertify: AlertifyService
  ) {
    super(spinner);
  }
  async getCharacter() {
    const allCharacter: { characters: ListCharacter[] } =
      await this.characterService.getCharacter();
    this.listOfCharacter = allCharacter.characters;
  }

  async ngOnInit() {
    await this.getCharacter();
  }

  @Output()
  createdCharacterLevelBoost: EventEmitter<CreateCharacterLevelBoost> = new EventEmitter();

  create(
    txtName: HTMLInputElement,
    txtPrice: HTMLInputElement,
    txtRank: HTMLInputElement
  ) {
    this.showSpinner(SpinnerType.BallAtom);
    const createCharacterLevelBoost: CreateCharacterLevelBoost =
      new CreateCharacterLevelBoost();
    createCharacterLevelBoost.name = txtName.value;
    createCharacterLevelBoost.price = parseInt(txtPrice.value);
    createCharacterLevelBoost.rank = parseInt(txtRank.value);
    createCharacterLevelBoost.CharacterId = this.CharacterId;

    this.characterLevelBoostService.create(
      createCharacterLevelBoost,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Character Level Boost başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdCharacterLevelBoost.emit(createCharacterLevelBoost);
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
    this.CharacterId = event.id;
  }
}
