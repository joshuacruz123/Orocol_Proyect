import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovedadMineroComponent } from './novedad-minero.component';

describe('NovedadMineroComponent', () => {
  let component: NovedadMineroComponent;
  let fixture: ComponentFixture<NovedadMineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NovedadMineroComponent]
    });
    fixture = TestBed.createComponent(NovedadMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
