import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Company } from 'src/app/contracts/create_company';
import { List_Company } from 'src/app/contracts/list_company';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    company: Create_Company,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'companys',
        },
        company
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
  ): Promise<{ totalCount: number; companys: List_Company[] }> {
    const promiseData: Promise<{
      totalCount: number;
      companys: List_Company[];
    }> = this.httpClientService
      .get<{ totalCount: number; companys: List_Company[] }>({
        controller: 'companys',
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
  async getCompany(): Promise<{ companys: List_Company[] }> {
    const promiseData: Promise<{ companys: List_Company[] }> =
      this.httpClientService
        .get<{ companys: List_Company[] }>({
          controller: 'Companys',
        })
        .toPromise();

    return await promiseData;
  }

  // async delete(id: string) {
  //   const deleteObservable: Observable<any> =
  //     this.httpClientService.delete<any>(
  //       {
  //         controller: 'companys',
  //       },
  //       id
  //     );
  //   await firstValueFrom(deleteObservable);
  // }
}
