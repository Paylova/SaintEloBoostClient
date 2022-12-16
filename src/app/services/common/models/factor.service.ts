import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateFactor } from 'src/app/contracts/factors/create-factor';
import { ListFactor } from 'src/app/contracts/factors/list-factor';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class FactorService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    factor: CreateFactor,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'factors',
        },
        factor
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
  ): Promise<{ totalCount: number; factors: ListFactor[] }> {
    const promiseData: Promise<{ totalCount: number; factors: ListFactor[] }> =
      this.httpClientService
        .get<{ totalCount: number; factors: ListFactor[] }>({
          controller: 'factors',
          queryString: `page=${page}&size=${size}`,
        })
        .toPromise();

    promiseData
      .then((d) => successCallBack())
      .catch((errorRespone: HttpErrorResponse) =>
        errorCallBack(errorRespone.message)
      );
    return await promiseData;
  }

  async getFactor(): Promise<{ factors: ListFactor[] }> {
    const promiseData: Promise<{ factors: ListFactor[] }> =
      this.httpClientService
        .get<{ factors: ListFactor[] }>({
          controller: 'factors',
        })
        .toPromise();

    return await promiseData;
  }
}
