import { List_Game } from '../list_game';

export class ListService {
  id: string;
  name: string;
  game: List_Game;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
