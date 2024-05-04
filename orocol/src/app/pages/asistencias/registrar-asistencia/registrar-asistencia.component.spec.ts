import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarAsistenciaComponent } from './registrar-asistencia.component';

describe('RegistrarAsistenciaComponent', () => {
  let component: RegistrarAsistenciaComponent;
  let fixture: ComponentFixture<RegistrarAsistenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarAsistenciaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarAsistenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
