import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateModerator } from 'src/app/contracts/moderators/create-moderator';
import { ListModerator } from 'src/app/contracts/moderators/list-moderator';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ModeratorService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    moderator: CreateModerator,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'moderators',
        },
        moderator
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
  ): Promise<{ totalCount: number; moderators: ListModerator[] }> {
    const promiseData: Promise<{
      totalCount: number;
      moderators: ListModerator[];
    }> = this.httpClientService
      .get<{ totalCount: number; moderators: ListModerator[] }>({
        controller: 'moderators',
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

  async getModerator(): Promise<{ moderators: ListModerator[] }> {
    const promiseData: Promise<{ moderators: ListModerator[] }> =
      this.httpClientService
        .get<{ moderators: ListModerator[] }>({
          controller: 'moderators',
        })
        .toPromise();

    return await promiseData;
  }
}
