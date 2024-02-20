import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrocolComponent } from './orocol.component';

describe('OrocolComponent', () => {
  let component: OrocolComponent;
  let fixture: ComponentFixture<OrocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrocolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
