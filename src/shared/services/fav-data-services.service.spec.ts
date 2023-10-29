import { TestBed } from '@angular/core/testing';

import { FavDataServicesService } from './fav-data.service';

describe('FavDataServicesService', () => {
  let service: FavDataServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavDataServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
