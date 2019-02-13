import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';

import { PostService } from '../post.service';
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
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

  getThumbnail(post: Post): string {
    return post.HasThumbnail ? 
      `https://cotbwexdata01.blob.core.windows.net/images/${post.Id}_thumbnail.jpg` :
      'https://via.placeholder.com/140.gif?text=No+Image';
  }
}
