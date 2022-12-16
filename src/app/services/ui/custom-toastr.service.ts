import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class CustomToastrService {
  constructor(private toastr: ToastrService) {}

  message(
    message: string,
    title: string,
    toastrOptions: Partial<ToastrOptions>
  ) {
    this.toastr[toastrOptions.messageType](message, title, {
      positionClass: toastrOptions.position,
    });
  }
}

export class ToastrOptions {
  messageType: MessageType;
  position: Position;
}

export enum MessageType {
  Success = 'success',
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}
export enum Position {
  TopRight = 'toast-top-right',
  TopCenter = 'toast-top-center',
  TopLeft = 'toast-top-left',
  TopFullWidth = 'toast-top-full-width',
  BottomRight = 'toast-bottom-left',
  BottomCenter = 'toast-bottom-left',
  BottomLeft = 'toast-bottom-left',
  BottomFullWidth = 'toast-bottom-full-width',
}
