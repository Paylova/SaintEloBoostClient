import { ListRole } from '../roles/list-role';

export class ListCharacter {
  id: string;
  name: string;
  Role: ListRole;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
