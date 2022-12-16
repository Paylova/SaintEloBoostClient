import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterLevelBoostsComponent } from './character-level-boosts.component';

describe('CharacterLevelBoostsComponent', () => {
  let component: CharacterLevelBoostsComponent;
  let fixture: ComponentFixture<CharacterLevelBoostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterLevelBoostsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterLevelBoostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
