import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCoach } from 'src/app/contracts/coaches/create-coach';
import { ListCoach } from 'src/app/contracts/coaches/list-coach';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CoachService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    coach: CreateCoach,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'coaches',
        },
        coach
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
  ): Promise<{ totalCount: number; coaches: ListCoach[] }> {
    const promiseData: Promise<{ totalCount: number; coaches: ListCoach[] }> =
      this.httpClientService
        .get<{ totalCount: number; coaches: ListCoach[] }>({
          controller: 'coaches',
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

  async getCoach(): Promise<{ coaches: ListCoach[] }> {
    const promiseData: Promise<{ coaches: ListCoach[] }> =
      this.httpClientService
        .get<{ coaches: ListCoach[] }>({
          controller: 'coaches',
        })
        .toPromise();
    return await promiseData;
  }
}
