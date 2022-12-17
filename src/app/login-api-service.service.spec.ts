import { TestBed } from '@angular/core/testing';

import { LoginApiServiceService } from './login-api-service.service';

describe('LoginApiServiceService', () => {
  let service: LoginApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
