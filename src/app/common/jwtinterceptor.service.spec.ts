import { TestBed } from '@angular/core/testing';

import { JWTInterceptorService } from './jwtinterceptor.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('JWTInterceptorService', () => {
  let service: JWTInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[{provide:JWTInterceptorService, useClass:JWTInterceptorService}]
    });
    service = TestBed.inject(JWTInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
