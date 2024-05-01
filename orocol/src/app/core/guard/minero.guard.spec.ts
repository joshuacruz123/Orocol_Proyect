import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { mineroGuard } from './minero.guard';

describe('mineroGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => mineroGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
