import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraOptionsComponent } from './extra-options.component';

describe('ExtraOptionsComponent', () => {
  let component: ExtraOptionsComponent;
  let fixture: ComponentFixture<ExtraOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExtraOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExtraOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
