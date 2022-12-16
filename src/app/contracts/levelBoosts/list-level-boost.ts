import { ListService } from '../services/list-service';

export class ListLevelBoost {
  id: string;
  start: number;
  end: number;
  price: number;
  service: ListService;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
