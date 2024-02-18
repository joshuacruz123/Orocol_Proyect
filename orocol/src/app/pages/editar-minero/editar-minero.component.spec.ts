import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarMineroComponent } from './editar-minero.component';

describe('EditarMineroComponent', () => {
  let component: EditarMineroComponent;
  let fixture: ComponentFixture<EditarMineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarMineroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
