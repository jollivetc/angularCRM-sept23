import { TestBed, waitForAsync } from '@angular/core/testing';

import { ConsumerService } from './consumer.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Consumer } from './model/consumer';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let httpTestingController:HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ConsumerService);
    httpTestingController= TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should call the server to create a consumer', waitForAsync(()=>{
    const consumerToSave:Consumer={
      civility:'Mr',
      firstname:"john",
      lastname:'Doe',
      email:'ab@cd.fr',
      phone:'12212232'
    }
    const consumerToReturn:Consumer={
      id:12,
      civility:'Mme',
      firstname:"john",
      lastname:'Doe',
      email:'ab@cd.fr',
      phone:'12212232',
      createdAt:121211221
    }
    service.saveConsumer(consumerToSave).subscribe({
      next:(c:Consumer)=>{expect(c).toEqual(consumerToSave)}
    })
    const request = httpTestingController.expectOne('/api/consumers');
    expect(request.request.method).toEqual('POST');
    expect(request.request.body).toEqual(consumerToSave);
    request.flush(consumerToReturn);
  }))
});
