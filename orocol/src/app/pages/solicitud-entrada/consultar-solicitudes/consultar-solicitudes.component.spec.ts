import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarSolicitudesComponent } from './consultar-solicitudes.component';

describe('ConsultarSolicitudesComponent', () => {
  let component: ConsultarSolicitudesComponent;
  let fixture: ComponentFixture<ConsultarSolicitudesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultarSolicitudesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultarSolicitudesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
