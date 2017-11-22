import { TestBed, inject } from '@angular/core/testing';

import { TransporteService } from './transporte.service';

describe('TransporteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransporteService]
    });
  });

  it('should be created', inject([TransporteService], (service: TransporteService) => {
    expect(service).toBeTruthy();
  }));
});
