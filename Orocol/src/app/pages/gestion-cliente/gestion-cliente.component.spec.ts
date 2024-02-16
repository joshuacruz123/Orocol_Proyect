import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionClienteComponent } from './gestion-cliente.component';

describe('GestionClienteComponent', () => {
  let component: GestionClienteComponent;
  let fixture: ComponentFixture<GestionClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionClienteComponent]
    });
    fixture = TestBed.createComponent(GestionClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
