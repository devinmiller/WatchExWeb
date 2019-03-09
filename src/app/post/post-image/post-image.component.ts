import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Post, Image } from 'src/app/models';

@Component({
  selector: 'app-post-image',
  templateUrl: './post-image.component.html',
  styleUrls: ['./post-image.component.scss']
})
export class PostImageComponent implements OnInit {
  @Input() post: Post;

  @ViewChild('image') clientImage: ElementRef<HTMLImageElement>;

  sourceImage: Image;

  constructor() { }

  ngOnInit() {
    let images = this.post.images
      .filter(image => image.height <= 640)
      .sort((x, y) => y.height - x.height);

    if(images) {
      this.sourceImage = images[0];
    }
  }

  getPreview = () => {
    
    return this.sourceImage ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${this.post.id}_${this.post.redditId}_${this.sourceImage.imageType === 1 ? 'Resolution':'Source'}_${this.sourceImage.width}_X_${this.sourceImage.height}.jpg` :
      'https://via.placeholder.com/640.gif?text=No+Image';
  }

}
