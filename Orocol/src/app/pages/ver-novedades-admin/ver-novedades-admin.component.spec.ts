import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerNovedadesAdminComponent } from './ver-novedades-admin.component';

describe('VerNovedadesAdminComponent', () => {
  let component: VerNovedadesAdminComponent;
  let fixture: ComponentFixture<VerNovedadesAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerNovedadesAdminComponent]
    });
    fixture = TestBed.createComponent(VerNovedadesAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
