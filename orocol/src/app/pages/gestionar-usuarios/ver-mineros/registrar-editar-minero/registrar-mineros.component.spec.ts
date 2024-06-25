import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarMinerosComponent } from './registrar-mineros.component';

describe('RegistrarMinerosComponent', () => {
  let component: RegistrarMinerosComponent;
  let fixture: ComponentFixture<RegistrarMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
