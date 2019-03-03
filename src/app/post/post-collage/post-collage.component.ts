import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Post } from 'src/app/models';
import { MatPaginator, PageEvent } from '@angular/material';
import { PostService } from '../post.service';
import { ScrollDispatcher, CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { PostImageComponent } from '../post-image/post-image.component';

@Component({
  selector: 'app-post-collage',
  templateUrl: './post-collage.component.html',
  styleUrls: ['./post-collage.component.scss']
})
export class PostCollageComponent implements OnInit {
  posts: Post[] = [];
  postTotal: number = 0;

  viewIndex = 0;

  columnMap = new Map<number, Post[]>();
  columns: Array<Post[]>;
  columnCount: number = 4;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private viewportRuler: ViewportRuler,
    private postService: PostService) { }

  ngOnInit() {
    this.columns = new Array<Post[]>(this.columnCount);

    this.applyFilter();

    this.scrollDispatcher.register(this.scrollable);
    this.scrollDispatcher.scrolled().subscribe(event => {
      // console.log(this.viewportRuler.getViewportSize());
      // console.log(this.viewportRuler.getViewportRect());
      // console.log(this.viewportRuler.getViewportScrollPosition());
    });
  }

  applyFilter(value?: string) {
    this.posts = [];
    this.viewIndex = 0;
    this.getImages(value, this.viewIndex);
  }

  loadMore(value?: string) {
    this.viewIndex++;
    this.getImages(value, this.viewIndex);
  }

  private getImages(value?: string, index?: number) {
    let search = {
      term: value,
      page: index || 0
    };

    this.postService.getPosts(search).subscribe(response => {
      this.posts.push(...response);

      for (let i = this.columnCount - 1; i >= 0; i--) {
        this.columns[i] = this.posts.filter((_, x) => x % this.columnCount === i);
      }
    });
  }

  getPreview(post: Post): string {
    var preview = post.images.find(p => p.width === 640);

    return preview ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${post.id}_${post.redditId}_Resolution_${preview.width}_X_${preview.height}.jpg` :
      'https://via.placeholder.com/640.gif?text=No+Image';
  }

  getPlaceholder(index: number) {
    return `https://via.placeholder.com/140.gif?text=Image+${index}`;
  }

}
