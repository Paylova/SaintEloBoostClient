import { List_Game } from "../list_game";

export class ListServer {
    id: string;
    name: string;
    factor:number;
    game: List_Game;
    isDelete: boolean;
    isActive: boolean;
    createdDate: Date;
    updatedDate: Date;
}
