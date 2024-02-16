import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarEditarPersonaComponent } from './agregar-editar-persona.component';

describe('AgregarEditarPersonaComponent', () => {
  let component: AgregarEditarPersonaComponent;
  let fixture: ComponentFixture<AgregarEditarPersonaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgregarEditarPersonaComponent]
    });
    fixture = TestBed.createComponent(AgregarEditarPersonaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
