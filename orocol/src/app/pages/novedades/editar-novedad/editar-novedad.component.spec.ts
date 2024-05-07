import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNovedadComponent } from './editar-novedad.component';

describe('EditarNovedadComponent', () => {
  let component: EditarNovedadComponent;
  let fixture: ComponentFixture<EditarNovedadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarNovedadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarNovedadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
