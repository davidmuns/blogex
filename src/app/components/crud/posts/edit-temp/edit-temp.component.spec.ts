import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTempComponent } from './edit-temp.component';

describe('EditTempComponent', () => {
  let component: EditTempComponent;
  let fixture: ComponentFixture<EditTempComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTempComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
