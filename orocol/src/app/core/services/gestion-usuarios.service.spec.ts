import { TestBed } from '@angular/core/testing';

import { GestionUsuariosService } from './gestion-usuarios.service';

describe('GestionUsuariosService', () => {
  let service: GestionUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestionUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
