import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTopTierEloBoost } from 'src/app/contracts/topTierEloBoosts/create-top-tier-elo-boost';
import { ListTopTierEloBoost } from 'src/app/contracts/topTierEloBoosts/list-top-tier-elo-boost';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class TopTierEloBoostService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    topTierEloBoost: CreateTopTierEloBoost,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'toptiereloboosts',
        },
        topTierEloBoost
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
    errorCallBack?: (errorMessage) => void
  ): Promise<{ totalCount: number; topTierEloBoosts: ListTopTierEloBoost[] }> {
    const promiseData: Promise<{
      totalCount: number;
      topTierEloBoosts: ListTopTierEloBoost[];
    }> = this.httpClientService
      .get<{ totalCount: number; topTierEloBoosts: ListTopTierEloBoost[] }>({
        controller: 'topTierEloBoosts',
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

  async getTopTierEloBoosts(): Promise<{
    toptiereloboosts: ListTopTierEloBoost[];
  }> {
    const promiseData: Promise<{ toptiereloboosts: ListTopTierEloBoost[] }> =
      this.httpClientService
        .get<{ toptiereloboosts: ListTopTierEloBoost[] }>({
          controller: 'TopTierEloBoosts',
        })
        .toPromise();

    return await promiseData;
  }
}
