import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMineroComponent } from './productos-minero.component';

describe('ProductosMineroComponent', () => {
  let component: ProductosMineroComponent;
  let fixture: ComponentFixture<ProductosMineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductosMineroComponent]
    });
    fixture = TestBed.createComponent(ProductosMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
