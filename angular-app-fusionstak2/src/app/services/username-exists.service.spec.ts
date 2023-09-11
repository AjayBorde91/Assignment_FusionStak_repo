import { TestBed } from '@angular/core/testing';

import { UsernameExistsService } from './username-exists.service';

describe('UsernameExistsService', () => {
  let service: UsernameExistsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsernameExistsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
