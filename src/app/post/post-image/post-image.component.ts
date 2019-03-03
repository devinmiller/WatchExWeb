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
    var preview = this.post.images && this.post.images.find(p => p.width === 640 || p.width === 320);

    if(!preview) console.log(this.post.id);

    return preview ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${this.post.id}_${this.post.redditId}_Resolution_${preview.width}_X_${preview.height}.jpg` :
      'https://via.placeholder.com/640.gif?text=No+Image';
  }

}
