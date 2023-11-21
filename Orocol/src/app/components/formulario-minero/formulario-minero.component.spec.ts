import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioMineroComponent } from './formulario-minero.component';

describe('FormularioMineroComponent', () => {
  let component: FormularioMineroComponent;
  let fixture: ComponentFixture<FormularioMineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormularioMineroComponent]
    });
    fixture = TestBed.createComponent(FormularioMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
