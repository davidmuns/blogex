import { TestBed } from '@angular/core/testing';

import { LogsGuard } from './logs.guard';

describe('LogsGuard', () => {
  let guard: LogsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(LogsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
