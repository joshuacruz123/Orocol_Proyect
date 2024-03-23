import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsistenciasMinerosComponent } from './asistencias-mineros.component';

describe('AsistenciasMinerosComponent', () => {
  let component: AsistenciasMinerosComponent;
  let fixture: ComponentFixture<AsistenciasMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AsistenciasMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AsistenciasMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
