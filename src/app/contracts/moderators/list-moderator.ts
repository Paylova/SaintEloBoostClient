import { List_Employee } from '../list_employee';

export class ListModerator {
  id: string;
  authority: string;
  Employee: List_Employee;
  isDelete: boolean;
  isActive: boolean;
  createdDate: Date;
  updatedDate: Date;
}
