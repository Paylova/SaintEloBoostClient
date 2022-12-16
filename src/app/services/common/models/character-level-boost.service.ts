import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCharacterLevelBoost } from 'src/app/contracts/characterLevelBoosts/create-character-level-boost';
import { ListCharacterLevelBoost } from 'src/app/contracts/characterLevelBoosts/list-character-level-boost';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterLevelBoostService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    characterLevelBoost: CreateCharacterLevelBoost,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'characterLevelBoosts',
        },
        characterLevelBoost
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
  ): Promise<{
    totalCount: number;
    characterLevelBoosts: ListCharacterLevelBoost[];
  }> {
    const promiseData: Promise<{
      totalCount: number;
      characterLevelBoosts: ListCharacterLevelBoost[];
    }> = this.httpClientService
      .get<{
        totalCount: number;
        characterLevelBoosts: ListCharacterLevelBoost[];
      }>({
        controller: 'characterLevelBoosts',
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

  async getCharacterLevelBoost(): Promise<{
    characterLevelBoosts: ListCharacterLevelBoost[];
  }> {
    const promiseData: Promise<{
      characterLevelBoosts: ListCharacterLevelBoost[];
    }> = this.httpClientService
      .get<{ characterLevelBoosts: ListCharacterLevelBoost[] }>({
        controller: 'CharacterLevelBoosts',
      })
      .toPromise();

    return await promiseData;
  }
}
