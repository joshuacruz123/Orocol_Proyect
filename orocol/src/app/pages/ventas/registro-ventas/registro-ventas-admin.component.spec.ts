import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroVentasAdminComponent } from './registro-ventas-admin.component';

describe('RegistroVentasAdminComponent', () => {
  let component: RegistroVentasAdminComponent;
  let fixture: ComponentFixture<RegistroVentasAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroVentasAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistroVentasAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
