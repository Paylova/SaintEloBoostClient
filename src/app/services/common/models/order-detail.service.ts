import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateOrderDetail } from 'src/app/contracts/orderDetails/create-order-detail';
import { ListOrderDetail } from 'src/app/contracts/orderDetails/list-order-detail';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class OrderDetailService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    orderDetail: CreateOrderDetail,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'orderdetails',
        },
        orderDetail
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
  ): Promise<{ totalCount: number; orderdetails: ListOrderDetail[] }> {
    const promiseData: Promise<{
      totalCount: number;
      orderdetails: ListOrderDetail[];
    }> = this.httpClientService
      .get<{ totalCount: number; orderdetails: ListOrderDetail[] }>({
        controller: 'orderdetails',
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

  async getOrderDetail(): Promise<{ orderdetails: ListOrderDetail[] }> {
    const promiseData: Promise<{ orderdetails: ListOrderDetail[] }> =
      this.httpClientService
        .get<{ orderdetails: ListOrderDetail[] }>({
          controller: 'orderdetails',
        })
        .toPromise();

    return await promiseData;
  }
}
