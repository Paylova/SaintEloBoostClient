import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateLevelBoost } from 'src/app/contracts/levelBoosts/create-level-boost';
import { ListLevelBoost } from 'src/app/contracts/levelBoosts/list-level-boost';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class LevelBoostService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    levelBoost: CreateLevelBoost,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'levelBoosts',
        },
        levelBoost
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
  ): Promise<{ totalCount: number; levelBoosts: ListLevelBoost[] }> {
    const promiseData: Promise<{ totalCount: number; levelBoosts: ListLevelBoost[]}> = 
      this.httpClientService
      .get<{ totalCount: number; levelBoosts: ListLevelBoost[] }>({
        controller: 'levelBoosts',
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

  async getLevelBoost(): Promise<{ levelBoosts: ListLevelBoost[] }> {
    const promiseData: Promise<{ levelBoosts: ListLevelBoost[] }> =
      this.httpClientService
        .get<{
          levelBoosts: ListLevelBoost[];
        }>({ controller: 'levelBoosts' })
        .toPromise();

    return await promiseData;
  }
}
