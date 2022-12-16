import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateServer } from 'src/app/contracts/servers/create-server';
import { ListServer } from 'src/app/contracts/servers/list-server';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ServerService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    server: CreateServer,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'servers',
        },
        server
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
  ): Promise<{ totalCount: number; servers: ListServer[] }> {
    const promiseData: Promise<{ totalCount: number; servers: ListServer[] }> =
      this.httpClientService
        .get<{ totalCount: number; servers: ListServer[] }>({
          controller: 'servers',
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

  async getServer(): Promise<{ servers: ListServer[] }> {
    const promiseData: Promise<{ servers: ListServer[] }> =
      this.httpClientService
        .get<{ servers: ListServer[] }>({
          controller: 'Servers',
        })
        .toPromise();

    return await promiseData;
  }
}
