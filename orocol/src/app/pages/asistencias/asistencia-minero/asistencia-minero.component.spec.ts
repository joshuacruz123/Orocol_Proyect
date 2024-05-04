import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciaMineroComponent } from './asistencia-minero.component';

describe('AsistenciaMineroComponent', () => {
  let component: AsistenciaMineroComponent;
  let fixture: ComponentFixture<AsistenciaMineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciaMineroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciaMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
