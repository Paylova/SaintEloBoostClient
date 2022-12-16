import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoostersComponent } from './boosters.component';

describe('BoostersComponent', () => {
  let component: BoostersComponent;
  let fixture: ComponentFixture<BoostersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoostersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoostersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
