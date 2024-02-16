import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionNovedadesMinComponent } from './gestion-novedades-min.component';

describe('GestionNovedadesMinComponent', () => {
  let component: GestionNovedadesMinComponent;
  let fixture: ComponentFixture<GestionNovedadesMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GestionNovedadesMinComponent]
    });
    fixture = TestBed.createComponent(GestionNovedadesMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
