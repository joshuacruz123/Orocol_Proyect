import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoOrocolComponent } from './info-orocol.component';

describe('InfoOrocolComponent', () => {
  let component: InfoOrocolComponent;
  let fixture: ComponentFixture<InfoOrocolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoOrocolComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoOrocolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
