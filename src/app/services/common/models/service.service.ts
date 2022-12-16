import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateService } from 'src/app/contracts/services/create-service';
import { ListService } from 'src/app/contracts/services/list-service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    service: CreateService,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'services',
        },
        service
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
  ): Promise<{ totalCount: number; services: ListService[] }> {
    const promiseData: Promise<{
      totalCount: number;
      services: ListService[];
    }> = this.httpClientService
      .get<{
        totalCount: number;
        services: ListService[];
      }>({
        controller: 'services',
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

  async getServices(): Promise<{ services: ListService[] }> {
    const promiseData: Promise<{ services: ListService[] }> =
      this.httpClientService
        .get<{ services: ListService[] }>({
          controller: 'Services',
        })
        .toPromise();

    return await promiseData;
  }
}
