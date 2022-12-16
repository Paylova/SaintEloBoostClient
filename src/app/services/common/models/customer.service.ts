import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCustomer } from 'src/app/contracts/customers/create-customer';
import { ListCustomer } from 'src/app/contracts/customers/list-customer';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    customer: CreateCustomer,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'customers',
        },
        customer
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
  ): Promise<{ totalCount: number; customers: ListCustomer[] }> {
    const promiseData: Promise<{
      totalCount: number;
      customers: ListCustomer[];
    }> = this.httpClientService
      .get<{ totalCount: number; customers: ListCustomer[] }>({
        controller: 'customers',
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

  async getCustomer(): Promise<{ customers: ListCustomer[] }> {
    const promiseData: Promise<{ customers: ListCustomer[] }> =
      this.httpClientService
        .get<{ customers: ListCustomer[] }>({
          controller: 'Customers',
        })
        .toPromise();
    return await promiseData;
  }
}
