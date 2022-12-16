import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LevelBoostsComponent } from './level-boosts.component';

describe('LevelBoostsComponent', () => {
  let component: LevelBoostsComponent;
  let fixture: ComponentFixture<LevelBoostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LevelBoostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LevelBoostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
