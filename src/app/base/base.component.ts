import { NgxSpinnerService, Spinner } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}

  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);
    setTimeout(() => this.hideSpinner(spinnerNameType));
  }
  hideSpinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType {
  SquareJellyBox = 's1',
  BallScaleMultiple = 's2',
  BallAtom = 's3',
  Pacman = 's4',
  BallSpinClockwiseFadeRotating = 's5',
}
