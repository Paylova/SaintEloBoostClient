import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Game } from 'src/app/contracts/create_game';
import { List_Game } from 'src/app/contracts/list_game';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    game: Create_Game,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'games',
        },
        game
      )
      .subscribe(
        (result) => {
          successCallBack();
        },
        (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((v, index) => {
            v.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        }
      );
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalCount: number; games: List_Game[] }> {
    const promiseData: Promise<{ totalCount: number; games: List_Game[] }> =
      this.httpClientService
        .get<{ totalCount: number; games: List_Game[] }>({
          controller: 'games',
          queryString: `page=${page}&size=${size}`,
        })
        .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }

  async getGame(): Promise<{ games: List_Game[] }> {
    const promiseData: Promise<{ games: List_Game[] }> = this.httpClientService
      .get<{ games: List_Game[] }>({
        controller: 'Games',
      })
      .toPromise();

    return await promiseData;
  }
}
