import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavMineroComponent } from './nav-minero.component';

describe('NavMineroComponent', () => {
  let component: NavMineroComponent;
  let fixture: ComponentFixture<NavMineroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavMineroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavMineroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
