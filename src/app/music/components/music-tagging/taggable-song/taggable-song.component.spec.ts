import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaggableSongComponent } from './taggable-song.component';

describe('TaggableSongComponent', () => {
  let component: TaggableSongComponent;
  let fixture: ComponentFixture<TaggableSongComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaggableSongComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaggableSongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
