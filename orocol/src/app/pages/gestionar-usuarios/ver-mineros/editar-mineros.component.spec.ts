import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMinerosComponent } from './editar-mineros.component';

describe('EditarMinerosComponent', () => {
  let component: EditarMinerosComponent;
  let fixture: ComponentFixture<EditarMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
