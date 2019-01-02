/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OgretmenService } from './ogretmen.service';

describe('Service: Ogretmen', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OgretmenService]
    });
  });

  it('should ...', inject([OgretmenService], (service: OgretmenService) => {
    expect(service).toBeTruthy();
  }));
});
