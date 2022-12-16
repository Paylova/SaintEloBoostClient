import { List_Game } from '../list_game';

export class ListTier {
  id: string;
  name: string;
  image: string;
  game: List_Game;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
