import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRole } from 'src/app/contracts/roles/create-role';
import { ListRole } from 'src/app/contracts/roles/list-role';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    role: CreateRole,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'roles',
        },
        role
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
  ): Promise<{ totalCount: number; roles: ListRole[] }> {
    const promiseData: Promise<{ totalCount: number; roles: ListRole[] }> =
      this.httpClientService
        .get<{ totalCount: number; roles: ListRole[] }>({
          controller: 'roles',
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

  async getRole(): Promise<{ roles: ListRole[] }> {
    const promiseData: Promise<{ roles: ListRole[] }> = this.httpClientService
      .get<{ roles: ListRole[] }>({
        controller: 'Roles',
      })
      .toPromise();

    return await promiseData;
  }
}
