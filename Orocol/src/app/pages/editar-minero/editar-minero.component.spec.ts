import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMineroComponent } from './editar-minero.component';

describe('EditarMineroComponent', () => {
  let component: EditarMineroComponent;
  let fixture: ComponentFixture<EditarMineroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarMineroComponent]
    });
    fixture = TestBed.createComponent(EditarMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
