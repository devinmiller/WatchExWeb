import { Component, OnInit, Input, ViewChildren, QueryList, OnChanges } from '@angular/core';
import { Post } from 'src/app/models';
import { PostImageComponent } from '../post-image/post-image.component';

@Component({
  selector: 'app-post-column',
  templateUrl: './post-column.component.html',
  styleUrls: ['./post-column.component.scss']
})
export class PostColumnComponent implements OnInit {
  @Input() posts: Post[] = [];

  @ViewChildren(PostImageComponent) postImages: QueryList<PostImageComponent>

  constructor() { }

  ngOnInit() {
  }

  getHeight(): number {
    return this.postImages.reduce((total, postImage) => {
      return postImage.clientImage ? total + postImage.clientImage.nativeElement.clientHeight : total;
    }, 0);
  }
}
