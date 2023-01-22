import { TestBed } from '@angular/core/testing';

import { TinyEditorService } from './tiny-editor.service';

describe('TinyEditorService', () => {
  let service: TinyEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinyEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
