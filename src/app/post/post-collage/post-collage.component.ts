import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { Post } from 'src/app/models';
import { MatPaginator, PageEvent } from '@angular/material';
import { PostService } from '../post.service';
import { ScrollDispatcher, CdkScrollable, ViewportRuler } from '@angular/cdk/overlay';

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

  applyFilter(value?: string, index?: number) {
    let search = {
      term: value,
      page: index || this.viewIndex++
    };

    console.log(this.columns);

    this.postService.getCollage(search).subscribe(response => {
      this.posts.push(...response.posts);

      for (let i = this.columnCount - 1; i >= 0; i--) {
        this.columns[i] = this.posts.filter((_, x) => x % this.columnCount === i);
      }

      console.log(this.columns);

      this.postTotal = response.count;
    });
  }

  getPreview(post: Post): string {
    return post.HasPreview ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${post.Id}_preview_source.jpg` :
      'https://via.placeholder.com/140.gif?text=No+Image';
  }

}
