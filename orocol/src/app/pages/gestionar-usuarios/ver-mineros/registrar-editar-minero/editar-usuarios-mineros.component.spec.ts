import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarUsuariosMinerosComponent } from './editar-usuarios-mineros.component';

describe('EditarUsuariosMinerosComponent', () => {
  let component: EditarUsuariosMinerosComponent;
  let fixture: ComponentFixture<EditarUsuariosMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarUsuariosMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarUsuariosMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
