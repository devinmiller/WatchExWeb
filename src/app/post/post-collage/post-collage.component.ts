import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Post } from '../../models';
import { PostService } from '../post.service';
import { ScrollDispatcher, CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { PostImageComponent } from '../post-image/post-image.component';
import { PostColumnComponent } from '../post-column/post-column.component';

@Component({
  selector: 'app-post-collage',
  templateUrl: './post-collage.component.html',
  styleUrls: ['./post-collage.component.scss']
})
export class PostCollageComponent implements OnInit {
  posts: Post[];

  viewIndex = 0;

  targetWidth: number = 960;

  columns: Array<Post[]>;
  columnCount: number = 3;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  @ViewChildren(PostColumnComponent) postColumns: QueryList<PostColumnComponent>

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private viewportRuler: ViewportRuler,
    private postService: PostService) { }

  ngOnInit() {
    this.reset();

    this.scrollDispatcher.register(this.scrollable);
    this.scrollDispatcher.scrolled().subscribe(event => {
      // console.log(this.viewportRuler.getViewportSize());
      // console.log(this.viewportRuler.getViewportRect());
      // console.log(this.viewportRuler.getViewportScrollPosition());
    });

    this.applyFilter();
  }

  applyFilter(value?: string) {
    this.reset();
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

      response.forEach((post: Post) => {
        let index = this.getIndexToPopulate();

        console.log(index);

        let column = this.columns[index];
        column.push(post);
      });
    });
  }

  private reset() {
    this.viewIndex = 0;
    this.posts = [];
    this.columns = new Array<Post[]>(this.columnCount);

    for (let i = 0; i < this.columnCount; i++) {
      this.columns[i] = <Post[]>[];
    } 
  }

  private getIndexToPopulate(): number {
    return this.columns.reduce((prev, _, curr) => {
      return  this.getTotalHeight(this.columns[prev]) <= this.getTotalHeight(this.columns[curr]) ? prev : curr;
    }, 0);
  }

  private getTotalHeight = (posts: Post[]): number => {
    return posts.reduce((t, p) => t + p.getScaledHeight(this.targetWidth), 0);
  };
}
