import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoteVentasComponent } from './repote-ventas.component';

describe('RepoteVentasComponent', () => {
  let component: RepoteVentasComponent;
  let fixture: ComponentFixture<RepoteVentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepoteVentasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RepoteVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
