import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateExtraOption } from 'src/app/contracts/extraOptions/create-extra-option';
import { ListExtraOption } from 'src/app/contracts/extraOptions/list-extra-option';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ExtraOptionService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    extraOption: CreateExtraOption,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'extraOptions',
        },
        extraOption
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
  ): Promise<{ totalCount: number; extraOptions: ListExtraOption[] }> {
    const promiseData: Promise<{
      totalCount: number;
      extraOptions: ListExtraOption[];
    }> = this.httpClientService
      .get<{ totalCount: number; extraOptions: ListExtraOption[] }>({
        controller: 'extraOptions',
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

  async getExtraOption(): Promise<{ extraOptions: ListExtraOption[] }> {
    const promiseData: Promise<{ extraOptions: ListExtraOption[] }> =
      this.httpClientService
        .get<{ extraOptions: ListExtraOption[] }>({
          controller: 'extraOptions',
        })
        .toPromise();

    return await promiseData;
  }
}
