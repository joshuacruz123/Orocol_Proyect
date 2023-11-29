import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerClientesMinComponent } from './ver-clientes-min.component';

describe('VerClientesMinComponent', () => {
  let component: VerClientesMinComponent;
  let fixture: ComponentFixture<VerClientesMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerClientesMinComponent]
    });
    fixture = TestBed.createComponent(VerClientesMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
