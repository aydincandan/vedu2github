/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidationServiceService } from './ValidationService.service';

describe('Service: ValidationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationServiceService]
    });
  });

  it('should ...', inject([ValidationServiceService], (service: ValidationServiceService) => {
    expect(service).toBeTruthy();
  }));
});
