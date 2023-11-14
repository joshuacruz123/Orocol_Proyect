import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MineroComponent } from './minero.component';

describe('MineroComponent', () => {
  let component: MineroComponent;
  let fixture: ComponentFixture<MineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MineroComponent]
    });
    fixture = TestBed.createComponent(MineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
