import { ListCharacter } from '../character/list-character';

export class ListCharacterLevelBoost {
  id: string;
  name: string;
  rank: number;
  price: number;
  Character: ListCharacter;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
