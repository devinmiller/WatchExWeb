import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { PostService } from '../post.service';
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  searchCtrl = new FormControl('');

  posts: Post[];

  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.getPosts(this.searchCtrl.value).subscribe(response => {
      this.posts = response.posts;
    });
  }

  search() {
    console.log('search!');
    this.postService.getPosts(this.searchCtrl.value).subscribe(response => {
      this.posts = response.posts;
    });
  }

}
