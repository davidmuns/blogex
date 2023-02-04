import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryVideosComponent } from './gallery-videos.component';

describe('GalleryVideosComponent', () => {
  let component: GalleryVideosComponent;
  let fixture: ComponentFixture<GalleryVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GalleryVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
