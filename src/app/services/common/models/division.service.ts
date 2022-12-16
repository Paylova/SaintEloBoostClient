import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateDivision } from 'src/app/contracts/divisions/create-division';
import { ListDivision } from 'src/app/contracts/divisions/list-division';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class DivisionService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    division: CreateDivision,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'divisions',
        },
        division
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
  ): Promise<{ totalCount: number; divisions: ListDivision[] }> {
    const promiseData: Promise<{
      totalCount: number;
      divisions: ListDivision[];
    }> = this.httpClientService
      .get<{ totalCount: number; divisions: ListDivision[] }>({
        controller: 'divisions',
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

  async getDivision(): Promise<{ divisions: ListDivision[] }> {
    const promiseData: Promise<{ divisions: ListDivision[] }> =
      this.httpClientService
        .get<{ divisions: ListDivision[] }>({
          controller: 'divisions',
        })
        .toPromise();

    return await promiseData;
  }
}
