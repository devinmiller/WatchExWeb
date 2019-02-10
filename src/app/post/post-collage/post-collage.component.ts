import { Component, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models';
import { MatPaginator, PageEvent } from '@angular/material';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-collage',
  templateUrl: './post-collage.component.html',
  styleUrls: ['./post-collage.component.scss']
})
export class PostCollageComponent implements OnInit {
  posts: Post[] = [];
  postTotal: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.applyFilter();
  }

  applyFilter(value?: string, pageEvent?: PageEvent) {
    let search = {
      term: value,
      page: pageEvent ? pageEvent.pageIndex : 0
    };

    this.postService.getPosts(search).subscribe(response => {
      this.posts = response.posts;
      this.postTotal = response.count;
    });
  }

  getPreview(post: Post): string {
    return post.HasThumbnail ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${post.Id}_preview_source.jpg` :
      'https://via.placeholder.com/140.gif?text=No+Image';
  }

}
