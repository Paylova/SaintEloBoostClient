import { ListService } from '../services/list-service';

export class ListExtraOption {
  id: string;
  name: string;
  price: number;
  Service: ListService;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
