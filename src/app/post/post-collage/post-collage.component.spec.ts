import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostCollageComponent } from './post-collage.component';

describe('PostCollageComponent', () => {
  let component: PostCollageComponent;
  let fixture: ComponentFixture<PostCollageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostCollageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCollageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
