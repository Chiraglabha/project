/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AddUserService } from './add-user.service';

describe('Service: AddUser', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddUserService]
    });
  });

  it('should ...', inject([AddUserService], (service: AddUserService) => {
    expect(service).toBeTruthy();
  }));
});
