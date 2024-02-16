import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarNovedadMinComponent } from './editar-novedad-min.component';

describe('EditarNovedadMinComponent', () => {
  let component: EditarNovedadMinComponent;
  let fixture: ComponentFixture<EditarNovedadMinComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditarNovedadMinComponent]
    });
    fixture = TestBed.createComponent(EditarNovedadMinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
