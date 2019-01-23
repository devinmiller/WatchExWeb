import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

import { MatPaginator } from '@angular/material';

import { PostService } from '../post.service';
import { Post } from 'src/app/models';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  searchCtrl = new FormControl('');
  posts: Post[] = [];
  postTotal: number = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.search();

    this.paginator.page.subscribe(x => this.search());
  }

  search() {
    console.log('Search Called');
    let search = {
      term: this.searchCtrl.value,
      page: this.paginator.pageIndex
    };

    this.postService.getPosts(search).subscribe(response => {
      this.posts = response.posts;
      this.postTotal = response.count;
    });
  }

}
