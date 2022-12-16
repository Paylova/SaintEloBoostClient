import { List_Company } from "./list_company";

export class List_Game {
    id: string;
    name: string;
    company : List_Company ;
    isDelete: boolean;
    isActive: boolean;
    createdDate: Date;
    updatedDate: Date;
}
