import { Component, OnInit, Input } from '@angular/core';
import { Post } from 'src/app/models';

@Component({
  selector: 'app-post-column',
  templateUrl: './post-column.component.html',
  styleUrls: ['./post-column.component.scss']
})
export class PostColumnComponent implements OnInit {
  @Input() posts: Post[];

  constructor() { }

  ngOnInit() {
  }

}
