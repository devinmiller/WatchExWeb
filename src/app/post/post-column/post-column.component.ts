import { Component, OnInit, Input, ViewChildren, QueryList } from '@angular/core';
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

  getSourceHeight(): number {
    return this.postImages.reduce((total, postImage) => {
      return postImage.sourceImage ? total + postImage.sourceImage.height : total;
    }, 0);
  }

  getNativeHeight(): number {
    return this.postImages.reduce((total, postImage) => {
      return postImage.nativeImage ? total + postImage.nativeImage.nativeElement.height : total;
    }, 0);
  }
}
