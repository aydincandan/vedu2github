/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TakvimService } from './takvim.service';

describe('Service: Takvim', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TakvimService]
    });
  });

  it('should ...', inject([TakvimService], (service: TakvimService) => {
    expect(service).toBeTruthy();
  }));
});
