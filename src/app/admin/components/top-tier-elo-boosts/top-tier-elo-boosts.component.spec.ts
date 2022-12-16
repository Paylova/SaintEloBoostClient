import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopTierEloBoostsComponent } from './top-tier-elo-boosts.component';

describe('TopTierEloBoostsComponent', () => {
  let component: TopTierEloBoostsComponent;
  let fixture: ComponentFixture<TopTierEloBoostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopTierEloBoostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopTierEloBoostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
