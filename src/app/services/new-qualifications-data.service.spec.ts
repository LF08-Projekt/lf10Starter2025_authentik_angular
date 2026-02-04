import { TestBed } from '@angular/core/testing';

import { NewQualificationsDataService } from './new-qualifications-data.service';

describe('NewQualificationsDataService', () => {
  let service: NewQualificationsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewQualificationsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
