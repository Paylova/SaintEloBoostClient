import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Create_Employee } from 'src/app/contracts/create_employee';
import { List_Employee } from 'src/app/contracts/list_employee';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    employee: Create_Employee,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'employees',
        },
        employee
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
  ): Promise<{ totalCount: number; employees: List_Employee[] }> {
    const promiseData: Promise<{
      totalCount: number;
      employees: List_Employee[];
    }> = this.httpClientService
      .get<{ totalCount: number; employees: List_Employee[] }>({
        controller: 'employees',
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

  async getEmployee(): Promise<{ employees: List_Employee[] }> {
    const promiseData: Promise<{ employees: List_Employee[] }> =
      this.httpClientService
        .get<{ employees: List_Employee[] }>({
          controller: 'Employees',
        })
        .toPromise();
    return await promiseData;
  }
}
