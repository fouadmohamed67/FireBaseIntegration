import { TestBed } from '@angular/core/testing';

import { StringServiceService } from './string-service.service';

describe('StringServiceService', () => {
  let service: StringServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StringServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
