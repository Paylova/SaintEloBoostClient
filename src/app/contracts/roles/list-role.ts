import { List_Game } from '../list_game';

export class ListRole {
  id: string;
  name: string;
  Game: List_Game;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
