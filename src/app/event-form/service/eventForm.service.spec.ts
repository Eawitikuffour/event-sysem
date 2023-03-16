/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventFormService } from './eventForm.service';

describe('Service: EventForm', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventFormService]
    });
  });

  it('should ...', inject([EventFormService], (service: EventFormService) => {
    expect(service).toBeTruthy();
  }));
});
