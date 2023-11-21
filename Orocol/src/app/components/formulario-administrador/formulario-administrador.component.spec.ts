import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAdministradorComponent } from './formulario-administrador.component';

describe('FormularioAdministradorComponent', () => {
  let component: FormularioAdministradorComponent;
  let fixture: ComponentFixture<FormularioAdministradorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioAdministradorComponent]
    });
    fixture = TestBed.createComponent(FormularioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
