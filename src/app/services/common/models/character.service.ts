import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCharacter } from 'src/app/contracts/character/create-character';
import { ListCharacter } from 'src/app/contracts/character/list-character';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  constructor(private httpClientService: HttpClientService) {}
  create(
    character: CreateCharacter,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'characters',
        },
        character
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
  ): Promise<{ totalCount: number; characters: ListCharacter[] }> {
    const promiseData: Promise<{
      totalCount: number;
      characters: ListCharacter[];
    }> = this.httpClientService
      .get<{ totalCount: number; characters: ListCharacter[] }>({
        controller: 'characters',
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

  async getCharacter(): Promise<{ characters: ListCharacter[] }> {
    const promiseData: Promise<{ characters: ListCharacter[] }> =
      this.httpClientService
        .get<{ characters: ListCharacter[] }>({
          controller: 'characters',
        })
        .toPromise();

    return await promiseData;
  }
}
