import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegresarHomeComponent } from './regresar-home.component';

describe('RegresarHomeComponent', () => {
  let component: RegresarHomeComponent;
  let fixture: ComponentFixture<RegresarHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegresarHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegresarHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
