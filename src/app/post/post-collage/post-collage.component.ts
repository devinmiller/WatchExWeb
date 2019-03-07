import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { Post } from 'src/app/models';
import { MatPaginator, PageEvent } from '@angular/material';
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
  posts: Post[] = [];
  postTotal: number = 0;

  viewIndex = 0;

  columnMap = new Map<number, Post[]>();
  columns: Array<Post[]>;
  columnCount: number = 5;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  @ViewChildren(PostColumnComponent) postColumns: QueryList<PostColumnComponent>

  constructor(
    private scrollDispatcher: ScrollDispatcher,
    private viewportRuler: ViewportRuler,
    private postService: PostService) { }

  ngOnInit() {
    this.columns = new Array<Post[]>(this.columnCount).fill([]);

    this.scrollDispatcher.register(this.scrollable);
    this.scrollDispatcher.scrolled().subscribe(event => {
      // console.log(this.viewportRuler.getViewportSize());
      // console.log(this.viewportRuler.getViewportRect());
      // console.log(this.viewportRuler.getViewportScrollPosition());
    });
  }

  ngAfterViewInit() {
    this.applyFilter();
  }

  applyFilter(value?: string) {
    this.posts = [];
    this.viewIndex = 0;

    this.getImages(value, this.viewIndex);
  }

  loadMore(value?: string) {
    this.postColumns.forEach(x => console.log(x.getSourceHeight()))

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

  private getShortestColumn(): PostColumnComponent[] {
    return this.postColumns
      .toArray()
      .sort((x, y) => {
        return x.getSourceHeight() - y.getSourceHeight();
      });
  }
}
