import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss']
})
export class PostImageComponent implements OnInit {
  @Input() post: Post;

  constructor() { }

  ngOnInit() {
    
  }

  getPreview = () => {
    return this.post.HasPreview ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${this.post.Id}_preview_source.jpg` :
      'https://via.placeholder.com/140.gif?text=No+Image';
  }

}
