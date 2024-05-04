import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarNovedadComponent } from './consultar-novedad.component';

describe('ConsultarNovedadComponent', () => {
  let component: ConsultarNovedadComponent;
  let fixture: ComponentFixture<ConsultarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarNovedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
