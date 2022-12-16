import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Company } from 'src/app/contracts/create_company';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-companys',
  templateUrl: './companys.component.html',
  styleUrls: ['./companys.component.scss'],
})
export class CompanysComponent extends BaseComponent implements OnInit {
  constructor(spinner: NgxSpinnerService) {
    super(spinner);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
  }
  @ViewChild(ListComponent) listComponents: ListComponent;
  createdCompany(createdCompany: Create_Company) {
    this.listComponents.getCompanys();
  }
}

// this.httpsClientService
//   .get<Create_Company[]>({
//     controller: 'Companys',
//   })
//   .subscribe((data) => console.log(data));

// this.httpsClientService
//   .post({ controller: 'Companys' }, { name: 'Saint' })
//   .subscribe();

// this.httpsClientService
//   .put(
//     { controller: 'Companys' },
//     { id: '078031e0-623f-4c72-826f-ce0d84fa967a', name: 'osman' }
//   )
//   .subscribe();

// this.httpsClientService
//   .delete(
//     { controller: 'Companys' },
//     '078031e0-623f-4c72-826f-ce0d84fa967a'
//   )
//   .subscribe();
