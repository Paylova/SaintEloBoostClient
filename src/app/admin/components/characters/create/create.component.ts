import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateCharacter } from 'src/app/contracts/character/create-character';
import { CreateRole } from 'src/app/contracts/roles/create-role';
import { ListRole } from 'src/app/contracts/roles/list-role';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { CharacterService } from 'src/app/services/common/models/character.service';
import { RoleService } from 'src/app/services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
})
export class CreateComponent extends BaseComponent implements OnInit {
  listOfRole: Array<ListRole> = null;
  selectedOptions: Array<ListRole> = [];
  RoleId: string = null;
  constructor(
    spinner: NgxSpinnerService,
    private characterService: CharacterService,
    private alertify: AlertifyService,
    private roleService: RoleService
  ) {
    super(spinner);
  }
  async getRole() {
    const allRole: { roles: ListRole[] } = await this.roleService.getRole();
    this.listOfRole = allRole.roles;
  }

  async ngOnInit() {
    await this.getRole();
  }

  @Output() createdCharacter: EventEmitter<CreateCharacter> =
    new EventEmitter();

  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
    const createCharacter: CreateCharacter = new CreateCharacter();
    createCharacter.RoleId = this.RoleId;
    createCharacter.name = name.value;

    this.characterService.create(
      createCharacter,
      () => {
        this.hideSpinner(SpinnerType.BallAtom);
        this.alertify.message('Character başarıyla eklenmiştir', {
          dismissOthers: true,
          messageType: MessageType.Success,
          position: Position.BottomRight,
        });
        this.createdCharacter.emit(createCharacter);
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
    this.RoleId = event.id;
  }
}
