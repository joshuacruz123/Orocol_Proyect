import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentasMinerosComponent } from './ventas-mineros.component';

describe('VentasMinerosComponent', () => {
  let component: VentasMinerosComponent;
  let fixture: ComponentFixture<VentasMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentasMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VentasMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
