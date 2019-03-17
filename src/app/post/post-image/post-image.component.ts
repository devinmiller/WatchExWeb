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

  isLoaded: boolean = false;

  constructor() { }

  ngOnInit() {
    let images = this.post.images
      .filter(image => image.width <= 640)
      .sort((x, y) => y.width - x.width);

    if(images) {
      this.sourceImage = images[0];
    }
  }

  loaded = () => { 
    this.isLoaded = true;
   }

  error = () => {
    // fall back to placeholder if there is an error loading image
    this.clientImage.nativeElement.src = 'https://via.placeholder.com/960.gif?text=No+Image';
  }

  getPreview = () => {
    return this.sourceImage ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${this.post.id}_${this.post.redditId}_${this.sourceImage.imageType === 1 ? 'Resolution':'Source'}_${this.sourceImage.width}_X_${this.sourceImage.height}.jpg` :
      'https://via.placeholder.com/960.gif?text=No+Image';
  }

}
