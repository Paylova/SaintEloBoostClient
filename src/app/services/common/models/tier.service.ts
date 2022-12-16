import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTier } from 'src/app/contracts/tiers/create-tier';
import { ListTier } from 'src/app/contracts/tiers/list-tier';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class TierService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    tier: CreateTier,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'tiers',
        },
        tier
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
  ): Promise<{ totalCount: number; tiers: ListTier[] }> {
    const promiseData: Promise<{ totalCount: number; tiers: ListTier[] }> =
      this.httpClientService
        .get<{ totalCount: number; tiers: ListTier[] }>({
          controller: 'tiers',
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

  async getTier(): Promise<{ tiers: ListTier[] }> {
    const promiseData: Promise<{ tiers: ListTier[] }> = this.httpClientService
      .get<{ tiers: ListTier[] }>({
        controller: 'Tiers',
      })
      .toPromise();

    return await promiseData;
  }
}
