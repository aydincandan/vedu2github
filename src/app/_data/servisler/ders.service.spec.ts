/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { DersService } from './ders.service';

describe('Service: Ders', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DersService]
    });
  });

  it('should ...', inject([DersService], (service: DersService) => {
    expect(service).toBeTruthy();
  }));
});
