import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateBooster } from 'src/app/contracts/boosters/create_booster';
import { ListBooster } from 'src/app/contracts/boosters/list_booster';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class BoosterService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    booster: CreateBooster,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'boosters',
        },
        booster
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
  ): Promise<{ totalCount: number; boosters: ListBooster[] }> {
    const promiseData: Promise<{
      totalCount: number;
      boosters: ListBooster[];
    }> = this.httpClientService
      .get<{ totalCount: number; boosters: ListBooster[] }>({
        controller: 'boosters',
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

  async getBooster(): Promise<{ boosters: ListBooster[] }> {
    const promiseData: Promise<{ boosters: ListBooster[] }> =
      this.httpClientService
        .get<{ boosters: ListBooster[] }>({
          controller: 'Boosters',
        })
        .toPromise();

    return await promiseData;
  }
}
