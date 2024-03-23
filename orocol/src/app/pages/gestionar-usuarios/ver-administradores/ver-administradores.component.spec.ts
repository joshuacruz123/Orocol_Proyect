import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerAdministradoresComponent } from './ver-administradores.component';

describe('VerAdministradoresComponent', () => {
  let component: VerAdministradoresComponent;
  let fixture: ComponentFixture<VerAdministradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerAdministradoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerAdministradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
