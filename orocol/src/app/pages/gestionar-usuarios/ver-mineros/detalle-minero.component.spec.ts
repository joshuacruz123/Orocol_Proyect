import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMineroComponent } from './detalle-minero.component';

describe('DetalleMineroComponent', () => {
  let component: DetalleMineroComponent;
  let fixture: ComponentFixture<DetalleMineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleMineroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalleMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
