import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarNovedadComponent } from './registrar-novedad.component';

describe('RegistrarNovedadComponent', () => {
  let component: RegistrarNovedadComponent;
  let fixture: ComponentFixture<RegistrarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarNovedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
