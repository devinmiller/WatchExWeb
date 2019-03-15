import { Component, OnInit, ViewChild, ViewChildren, QueryList, NgZone, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material';
import { Post } from '../../models';
import { PostService } from '../post.service';
import { ScrollDispatcher, CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { PostImageComponent } from '../post-image/post-image.component';
import { PostColumnComponent } from '../post-column/post-column.component';
import { MediaObserver } from '@angular/flex-layout';
import { debounce } from 'rxjs/operators';
import { timer } from 'rxjs';

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

  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;

  @ViewChildren(PostColumnComponent) postColumns: QueryList<PostColumnComponent>

  constructor(
    private zone: NgZone,
    private mediaObserver: MediaObserver,
    private scrollDispatcher: ScrollDispatcher,
    private viewportRuler: ViewportRuler,
    private postService: PostService) { }

  ngOnInit() {
    this.resetView();

    this.mediaObserver.media$
      .subscribe(mediaChange => {
        switch (mediaChange.mqAlias) {
          case 'xl':
            this.resetColumns(4);
            break;
          case 'lg':
            this.resetColumns(3);
            break;
          case 'md':
            this.resetColumns(2);
            break;
          case 'sm':
          case 'xs':
          default:
            this.resetColumns(1);
            break;
        }
      });

    this.scrollDispatcher.register(this.scrollable);
    this.scrollDispatcher.scrolled().pipe(debounce(() => timer(500))).subscribe(event => {
      let totalheight = this.postColumns.reduce((p,c) => p + c.getHeight(), 0);
      let averageHeight = Math.ceil(totalheight / this.columnCount);

      let viewPort = this.viewportRuler.getViewportRect();

      if(viewPort.bottom >= averageHeight * .65) {
        this.zone.run(() => this.loadMore(this.filter.nativeElement.value));
      }
    });

    this.applyFilter();
  }

  calcWidth = () => {
    return Math.ceil(100 / this.columnCount);
  }

  applyFilter(value?: string) {
    this.resetView();
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
        let column = this.columns[index];

        column.push(post);
      });
    });
  }

  private resetColumns(count: number) {
    this.columnCount = count;
    this.columns = new Array<Post[]>(this.columnCount);

    for (let i = 0; i < this.columnCount; i++) {
      this.columns[i] = <Post[]>[];
    }

    this.posts.forEach((post: Post) => {
      let index = this.getIndexToPopulate();
      let column = this.columns[index];

      column.push(post);
    });
  }

  private resetView() {
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
