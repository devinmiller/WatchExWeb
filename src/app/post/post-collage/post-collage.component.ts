import { Component, OnInit, ViewChild, ViewChildren, QueryList, NgZone, ElementRef, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Post } from '../../models';
import { PostService } from '../post.service';
import { ScrollDispatcher, CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';
import { PostColumnComponent } from '../post-column/post-column.component';
import { MediaObserver } from '@angular/flex-layout';
import { debounce, throttle } from 'rxjs/operators';
import { timer, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post-collage',
  templateUrl: './post-collage.component.html',
  styleUrls: ['./post-collage.component.scss']
})
export class PostCollageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];

  viewIndex = 0;

  targetWidth: number = 960;

  columns: Array<Post[]>;
  columnCount: number = 3;

  @ViewChild(CdkScrollable) scrollable: CdkScrollable;

  @ViewChild('filter') filter: ElementRef<HTMLInputElement>;

  @ViewChildren(PostColumnComponent) postColumns: QueryList<PostColumnComponent>

  mediaSubscription: Subscription;
  scrollSubscription: Subscription;

  constructor(
    private zone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private mediaObserver: MediaObserver,
    private scrollDispatcher: ScrollDispatcher,
    private viewportRuler: ViewportRuler,
    private postService: PostService) { }

  ngOnInit() {
    this.CreateMediaObserver();
    this.createScrollObserver();

    this.route.paramMap
      .subscribe(params => {
        this.filter.nativeElement.value = params.get('f');

        this.applyFilter(params.get('f'));
      });
  }

  ngOnDestroy() {
    this.mediaSubscription.unsubscribe();
    this.scrollSubscription.unsubscribe();
  }

  calcWidth = () => {
    return Math.ceil(100 / this.columnCount);
  }

  applyFilter(value?: string) {
    this.resetView();

    let url: string;
    if(value) {
      url = this.router.createUrlTree(
        [{ f: value } ], 
        { relativeTo: this.route })
        .toString();
    } else {
      url = this.router.createUrlTree(
        [{ /* clear */ }], 
        { relativeTo: this.route })
        .toString();
    }
    
    this.location.go(url);

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

  private CreateMediaObserver() {
    this.mediaSubscription = this.mediaObserver.media$
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
  }

  private createScrollObserver() {
    this.scrollDispatcher.register(this.scrollable);

    this.scrollSubscription = this.scrollDispatcher.scrolled()
      .pipe(
        throttle(() => timer(500))
      )
      .subscribe(event => {
        let totalheight = this.postColumns.reduce((p,c) => p + c.getHeight(), 0);
        let averageHeight = Math.ceil(totalheight / this.columnCount);

        let viewPort = this.viewportRuler.getViewportRect();

        if(viewPort.bottom >= averageHeight * .65) {
          this.zone.run(() => this.loadMore(this.filter.nativeElement.value));
        }
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
