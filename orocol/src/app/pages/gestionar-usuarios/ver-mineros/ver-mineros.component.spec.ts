import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMinerosComponent } from './ver-mineros.component';

describe('VerMinerosComponent', () => {
  let component: VerMinerosComponent;
  let fixture: ComponentFixture<VerMinerosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerMinerosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VerMinerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
