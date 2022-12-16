import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrder } from 'src/app/contracts/orders/create-order';
import { ListOrder } from 'src/app/contracts/orders/list-order';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    order: CreateOrder,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'orders',
        },
        order
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
  ): Promise<{ totalCount: number; orders: ListOrder[] }> {
    const promiseData: Promise<{ totalCount: number; orders: ListOrder[] }> =
      this.httpClientService
        .get<{ totalCount: number; orders: ListOrder[] }>({
          controller: 'orders',
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

  async getOrder(): Promise<{ orders: ListOrder[] }> {
    const promiseData: Promise<{ orders: ListOrder[] }> = this.httpClientService
      .get<{ orders: ListOrder[] }>({
        controller: 'Orders',
      })
      .toPromise();

    return await promiseData;
  }
}
