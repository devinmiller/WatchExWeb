import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostColumnComponent } from './post-column.component';

describe('PostColumnComponent', () => {
  let component: PostColumnComponent;
  let fixture: ComponentFixture<PostColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
